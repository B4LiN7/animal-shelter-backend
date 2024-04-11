import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import * as process from 'process';


describe('Auth, user and location (e2e)', () => {
  let app: INestApplication;
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

    await app.init();
  });

  afterAll(async () => {
    const token = await loginUser();
    const users = await request(app.getHttpServer())
      .get('/user')
      .set('Authorization', `Bearer ${token.accessToken}`);
    for (const user of users.body) {
      if (user.username === 'admin') { continue; }
      await request(app.getHttpServer())
        .delete(`/user/${user.userId}`)
        .set('Authorization', `Bearer ${token.accessToken}`)
    }
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
});
