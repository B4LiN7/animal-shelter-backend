import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { PrismaExceptionFilter } from 'src/prisma/exception/prisma.exception.filter';
import * as CookieParser from 'cookie-parser';
import * as process from 'process';

describe('AppController (e2e)', () => {
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
          expect(res.body).toHaveProperty('token');
        });
    });

    it('should login (with create test user) ( /auth/login (POST) )', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: 'test', password: 'password' })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty(
            'message',
            'You have been logged in as test',
          );
          expect(res.body).toHaveProperty('token');
        });
    });

    it('should logout ( /auth/logout (POST) )', async () => {
      await loginUser(agent, 'test');
      return agent.get('/auth/logout').expect(200);
    });
  });

  describe('/pet endpoints', () => {
    describe('/pet (GET)', () => {
      it('should return nothing', () => {
        return request(app.getHttpServer()).get('/pet').expect(200).expect([]);
      });
    });
  });

  async function loginUser(
    agent: request.SuperTest<request.Test>,
    username: string = 'admin',
    password: string = 'password',
  ) {
    await agent
      .post('/auth/login')
      .send({ username: username, password: password })
      .expect(200);
  }
});
