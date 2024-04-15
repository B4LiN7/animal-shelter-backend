import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import * as process from 'process';
import { SpeciesType } from '../src/species/type/species.type';
import { PrismaClient } from '@prisma/client';

describe('Pet, breed and species (e2e)', () => {
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
    await prisma.$connect();
    await prisma.species.deleteMany();
    await prisma.breed.deleteMany();
    await prisma.petStatus.deleteMany();
    await prisma.pet.deleteMany();
    await prisma.$disconnect();
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
      await addBreeds(1, 1);
      const breedIds = await request(app.getHttpServer())
        .get('/breed')
        .expect(200)
        .then((res) => {
          return res.body.map((breed: any) => breed.breedId);
        });
      const addedPet = await request(app.getHttpServer())
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
          expect(res.body).toContainEqual(addedPet.body);
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
      .expect((res) => {
        expect(res.body).toHaveProperty('access_token');
        expect(res.body).toHaveProperty('refresh_token');
      });
    return {
      accessToken: response.body.access_token,
      refreshToken: response.body.refresh_token,
    };
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
