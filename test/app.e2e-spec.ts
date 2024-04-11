import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { PrismaExceptionFilter } from 'src/prisma/exception/prisma.exception';
import * as process from 'process';
import { SpeciesType } from '../src/species/type/species.type';

describe('App (e2e)', () => {
  let app: INestApplication;
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

    await app.init();
  });

  it('should reach root)', () => {
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
    it('should return all users', async () => {
      const token = await loginUser();
      return request(app.getHttpServer())
        .get('/user')
        .set('Authorization', `Bearer ${token.accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveLength(2);
        });
    });
    it('should return only the test user (logged in user)', async () => {
      const token = await loginUser('test');
      return request(app.getHttpServer())
        .get('/user/me')
        .set('Authorization', `Bearer ${token.accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('username', 'test');
        });
    });
    it('should throw and unauthorized error', async () => {
      const token = await loginUser('test');
      return request(app.getHttpServer())
        .get('/user')
        .set('Authorization', `Bearer ${token.accessToken}`)
        .expect(403);
    });
    it('should modify the test user (logged in user)', async () => {
      const token = await loginUser('test');
      return request(app.getHttpServer())
        .put('/user/me')
        .set('Authorization', `Bearer ${token.accessToken}`)
        .send({ password: 'password2' })
        .expect(200);
    });
  });

  describe('/location endpoints', () => {
    it('should get the user locations which is zero', async () => {
      const tokens = await loginUser();
      return request(app.getHttpServer())
        .get('/location/my')
        .set('Authorization', `Bearer ${tokens.refreshToken}`)
        .expect(404);
    });
    it('should add a location to user', async () => {
      const tokens = await loginUser();
      await request(app.getHttpServer())
        .post('/location/my')
        .set('Authorization', `Bearer ${tokens.accessToken}`)
        .send({
          name: 'test',
          description: 'test',
          country: 'test',
          city: 'test',
          zipCode: 1234,
          address: 'test',
          addressExtra: 'test',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('locationId');
        });
      return request(app.getHttpServer())
        .get('/location/my')
        .set('Authorization', `Bearer ${tokens.accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveLength(1);
        });
    });
  });

  describe('/pet endpoints', () => {
    it('should return nothing', () => {
      return request(app.getHttpServer()).get('/pet').expect(200).expect([]);
    });
    it('should add a pet', async () => {
      const breedIds = await addBreeds();
      const token = await loginUser();
      const createdPet = await request(app.getHttpServer())
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
      return request(app.getHttpServer())
        .get(`/pet/${createdPet.body.petId}`)
        .expect(200);
    });
    it('should return all pets', async () => {
      const token = await loginUser();
      const breedIds = await request(app.getHttpServer())
        .get('/breed')
        .expect(200)
        .then((res) => {
          return res.body.map((breed: any) => breed.breedId);
        });
      await request(app.getHttpServer())
        .post('/pet')
        .set('Authorization', `Bearer ${token.accessToken}`)
        .send({
          name: 'test',
          breedId: getRandomElement(breedIds),
          description: 'test',
          sex: 'MALE',
          birthDate: '2020-01-01T00:00:00.000Z',
        })
        .expect(201);
      return request(app.getHttpServer())
        .get('/pet')
        .set('Authorization', `Bearer ${token.accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveLength(2);
        });
    });
  });

  describe('/adoption endpoints', () => {
    it('should return nothing', async () => {
      const token = await loginUser();
      return request(app.getHttpServer())
        .get('/adoption')
        .set('Authorization', `Bearer ${token.accessToken}`)
        .expect(200)
        .expect([]);
    });
  });

  // Helper functions
  async function loginUser(
    username: string = 'admin',
    password: string = 'password',
    verbose: boolean = false,
  ) {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: username, password: password })
      .expect((res) => {
        if (verbose) {
          console.log(
            `Login response from /auth/login (username: ${username}, password: ${password}):\n${JSON.stringify(res.body)}`,
          );
        }
        expect(res.body).toHaveProperty('access_token');
        expect(res.body).toHaveProperty('refresh_token');
      });
    return {
      accessToken: response.body.access_token,
      refreshToken: response.body.refresh_token,
    };
  }
  async function makeUser(username: string) {
    const registeredUser = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ username: username, password: 'password' })
      .expect(201);
    return {
      accessToken: registeredUser.body.access_token,
      refreshToken: registeredUser.body.refresh_token,
    };
  }
  async function getPet() {
    const token = await loginUser();
    const breedIds = await addBreeds();
    return request(app.getHttpServer())
      .post('/pet')
      .set('Authorization', `Bearer ${token.accessToken}`)
      .send({
        name: 'test',
        breedId: getRandomElement(breedIds),
        sex: 'FEMALE',
        birthDate: '2020-01-01T00:00:00.000Z',
        description: 'test',
      })
      .expect(201)
      .expect((res) => {
        return res.body;
      });
  }
  async function addBreeds(
    breedNumber: number = 1,
    speciesNumber: number = 1,
  ): Promise<string[]> {
    const token = await loginUser();
    for (let i = 0; i < speciesNumber; i++) {
      await request(app.getHttpServer())
        .post('/species')
        .set('Authorization', `Bearer ${token.accessToken}`)
        .send({
          name: Math.random().toString(),
          description: Math.random().toString(),
        })
        .expect(201);
    }
    const speciesIds = await request(app.getHttpServer())
      .get('/species')
      .set('Authorization', `Bearer ${token.accessToken}`)
      .expect(200)
      .then((res) => {
        return res.body.map((species: SpeciesType) => species.speciesId);
      });
    for (let i = 0; i < breedNumber; i++) {
      await request(app.getHttpServer())
        .post('/breed')
        .set('Authorization', `Bearer ${token.accessToken}`)
        .send({
          name: Math.random().toString(),
          description: Math.random().toString(),
          speciesId: getRandomElement(speciesIds),
        })
        .expect(201);
    }
    return await request(app.getHttpServer())
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
