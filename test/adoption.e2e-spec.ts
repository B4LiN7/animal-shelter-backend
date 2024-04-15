import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import * as process from 'process';
import { SpeciesType } from '../src/species/type/species.type';
import { PrismaClient } from '@prisma/client';

describe('Adoption (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaClient;
  process.env.DATABASE_URL =
    'postgresql://postgres:postgres@localhost:5432/shelter-test';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    );

    prisma = new PrismaClient();

    await app.init();
  });

  afterAll(async () => {
    await prisma.adoption.deleteMany();
    await prisma.petStatus.deleteMany();
    await prisma.pet.deleteMany();
    await prisma.breed.deleteMany();
    await prisma.species.deleteMany();
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

    it('should make an adoption', async () => {
      const token = await loginUser();
      const petId = await getPet();
      return request(app.getHttpServer())
        .post(`/adoption/pet/${petId}`)
        .set('Authorization', `Bearer ${token.accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('petId');
        });
    });

    it('should return the already running adoption', async () => {
      const token = await loginUser();
      const petId = await getPet();
      const adoption = await request(app.getHttpServer())
        .post(`/adoption/pet/${petId}`)
        .set('Authorization', `Bearer ${token.accessToken}`)
        .expect(200);
      return request(app.getHttpServer())
        .post(`/adoption/pet/${petId}`)
        .set('Authorization', `Bearer ${token.accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(adoption.body);
        });
    });

    it('should list my adoptions', async () => {
      const token = await loginUser();
      const petId = await getPet();
      await request(app.getHttpServer())
        .post(`/adoption/pet/${petId}`)
        .set('Authorization', `Bearer ${token.accessToken}`)
        .expect(200);
      return request(app.getHttpServer())
        .get('/adoption')
        .set('Authorization', `Bearer ${token.accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.length).toBeGreaterThan(0);
        });
    });

    it('should cancel adoption', async () => {
      const token = await loginUser();
      const petId = await getPet();
      await request(app.getHttpServer())
        .post(`/adoption/pet/${petId}`)
        .set('Authorization', `Bearer ${token.accessToken}`)
        .expect(200);
      return request(app.getHttpServer())
        .delete(`/adoption/pet/${petId}`)
        .set('Authorization', `Bearer ${token.accessToken}`)
        .expect(200);
    });

    it('should not cancel adoption', async () => {
      const token = await loginUser();
      const petId = await getPet();
      return request(app.getHttpServer())
        .delete(`/adoption/pet/${petId}`)
        .set('Authorization', `Bearer ${token.accessToken}`)
        .expect(404);
    });

    it('should finish adoption', async () => {
      const token = await loginUser();
      const petId = await getPet();
      const adoption = await request(app.getHttpServer())
        .post(`/adoption/pet/${petId}`)
        .set('Authorization', `Bearer ${token.accessToken}`)
        .expect(200);
      await request(app.getHttpServer())
        .put(`/adoption`)
        .send({
          status: 'APPROVED',
          reason: 'test',
          userId: adoption.body.userId,
          petId: adoption.body.petId,
        })
        .set('Authorization', `Bearer ${token.accessToken}`)
        .expect(200);
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
      .expect((res) => {
        expect(res.body).toHaveProperty('access_token');
        expect(res.body).toHaveProperty('refresh_token');
      });
    return {
      accessToken: response.body.access_token,
      refreshToken: response.body.refresh_token,
    };
  }

  async function getPet() {
    const token = await loginUser();
    const breedIds = await getBreeds();
    const response = await request(app.getHttpServer())
      .post('/pet')
      .set('Authorization', `Bearer ${token.accessToken}`)
      .send({
        name: 'test',
        breedId: getRandomElement(breedIds),
        sex: 'FEMALE',
        birthDate: '2020-01-01T00:00:00.000Z',
        description: 'test',
      })
      .expect(201);
    return response.body.petId;
  }
  async function getBreeds(
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
