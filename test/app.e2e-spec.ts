import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import '../src/tests/to-be-pdf';

describe('AppController (e2e)', () => {
  let app: INestApplication, server: any;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer();
  });

  describe('/ (GET)', () => {
    it('should return HTTP 200', () => request(server)
      .get('/')
      .expect(200));
  });

  describe('/create (POST)', () => {
    test('should return HTTP 400 for missing "html" field', () => request(server)
      .post('/create')
      .send({})
      .expect(400));

    test('should return PDF file', () => request(server)
      .post('/create')
      .send({html: '<div>test</div>'})
      .expect(201)
      .then(({body}) => {
        expect(body).toBePDF();
      }));
  });
});
