import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { PrismaExceptionFilter } from 'prisma/exception/prisma.exception.filter';
import * as CookieParser from 'cookie-parser';

describe('AppController (e2e)', () => {
  let app: INestApplication;

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
    app.enableCors();

    await app.init();
  });

  it('/ (GET) Root reachable', () => {
    return request(app.getHttpServer()).get('/').expect(200);
  });

  describe('/pet endpoints', () => {
    describe('/pet (GET)', () => {
      it('should return nothing', () => {
        return request(app.getHttpServer()).get('/pet').expect(200).expect([]);
      });
    });
  });
});
