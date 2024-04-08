import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { PrismaExceptionFilter } from 'src/prisma/exception/prisma.exception';
import * as CookieParser from 'cookie-parser';
import * as process from 'process';
import { SpeciesType } from '../src/species/type/species.type';

describe('App (e2e)', () => {
  let app: INestApplication;
  let agent: request.SuperTest<request.Test>;
  process.env.DATABASE_URL =
    'postgresql://postgres:postgres@localhost:5432/shelter-test';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new PrismaExceptionFilter());
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    );
    app.use(CookieParser());

    await app.init();

    agent = request.agent(app.getHttpServer());
  });

  it('should reach root ( / ) reachable)', () => {
    return request(app.getHttpServer()).get('/').expect(200);
  });

  describe('/auth endpoints', () => {
    it('should register ( /auth/register (POST) )', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({ username: 'test', password: 'password' })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('message');
          expect(res.body).toHaveProperty('access_token');
          expect(res.body).toHaveProperty('refresh_token');
        });
    });
    it('should login (with create test user) ( /auth/login (POST) )', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: 'test', password: 'password' })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('message');
          expect(res.body).toHaveProperty('access_token');
          expect(res.body).toHaveProperty('refresh_token');
        });
    });
    it('should refresh token ( /auth/refresh (POST) )', async () => {
      const tokens = await loginUser();
      return request(app.getHttpServer())
        .post('/auth/refresh')
        .set('Authorization', `Bearer ${tokens.refreshToken}`)
        .expect(200);
    });
    it('should logout ( /auth/logout (POST) )', async () => {
      const token = await loginUser('test');
      await loginUser('test');
      return request(app.getHttpServer())
        .get('/auth/logout')
        .set('Authorization', `Bearer ${token.refreshToken}`)
        .expect(200);
    });
  });

  describe('/user endpoints', () => {
    it('should return all users (admin and test)', async () => {
      const token = await loginUser();
      return agent
        .get('/user')
        .set('Authorization', `Bearer ${token.accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveLength(2);
        });
    });
    it('should return only the test user (logged in user)', async () => {
      const token = await loginUser('test');
      return agent
        .get('/user/me')
        .set('Authorization', `Bearer ${token.accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('username', 'test');
        });
    });
    it('should throw and unauthorized error', async () => {
      const token = await loginUser('test');
      return agent
        .get('/user')
        .set('Authorization', `Bearer ${token.accessToken}`)
        .expect(403);
    });
    it('should modify the test user (logged in user)', async () => {
      const token = await loginUser('test');
      return agent
        .put('/user/me')
        .set('Authorization', `Bearer ${token.accessToken}`)
        .send({ password: 'password2' })
        .expect(200);
    });
  });

  describe('/pet endpoints', () => {
    it('should return nothing', () => {
      return request(app.getHttpServer()).get('/pet').expect(200).expect([]);
    });
    it('should add a pet', async () => {
      const breedIds = await addBreeds(agent);
      const token = await loginUser();
      return agent
        .post('/pet')
        .set('Authorization', `Bearer ${token.accessToken}`)
        .send({
          name: 'test',
          breedId: getRandomElement(breedIds),
          sex: 'MALE',
          birthDate: '2020-01-01T00:00:00.000Z',
          description: 'test',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('petId');
        });
    });
  });

  // Helper functions

  async function loginUser(
    username: string = 'admin',
    password: string = 'password',
  ) {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: username, password: password })
      .expect(200);
    return {
      accessToken: response.body.access_token,
      refreshToken: response.body.refresh_token,
    };
  }

  async function addBreeds(
    agent: request.SuperTest<request.Test>,
    breedNumber: number = 1,
    speciesNumber: number = 1,
  ): Promise<string[]> {
    const token = await loginUser();
    for (let i = 0; i < speciesNumber; i++) {
      await agent
        .post('/species')
        .set('Authorization', `Bearer ${token.accessToken}`)
        .send({
          name: `test_species_${i}`,
          description: `test_description_${i}`,
        })
        .expect(201);
    }
    const speciesIds = await agent
      .get('/species')
      .set('Authorization', `Bearer ${token.accessToken}`)
      .expect(200)
      .then((res) => {
        return res.body.map((species: SpeciesType) => species.speciesId);
      });
    for (let i = 0; i < breedNumber; i++) {
      await agent
        .post('/breed')
        .set('Authorization', `Bearer ${token.accessToken}`)
        .send({
          name: `test_breed_${i}`,
          description: `test_description_${i}`,
          speciesId: getRandomElement(speciesIds),
        })
        .expect(201);
    }
    return await agent
      .get('/breed')
      .set('Authorization', `Bearer ${token.accessToken}`)
      .expect(200)
      .then((res) => {
        return res.body.map((breed: any) => breed.breedId);
      });
  }

  function getRandomElement(array: string[]): string {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }
});
