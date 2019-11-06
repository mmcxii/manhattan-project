const app = require('../server');
import mongoose from 'mongoose';
import request from 'supertest';
import { User } from '../models';

declare global {
  namespace NodeJS {
    interface Global {
      __MONGO_URI__: any;
    }
  }
}

let server = request.agent(app);
let token: any;
describe('auth routes', () => {
  beforeAll(async done => {
    await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, err => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
    done();
  });

  //register tests
  it('should create a user', async done => {
    const response = await server
      .post('/auth/register')
      .send({ username: 'Johns the best', password: 'testPass', admin: 'No admin' });
    expect(response.status).toBe(200);
    token = response.body.token;
    done();
  });

  it('should return 400 if no username is entered', async done => {
    const response = await server
      .post('/auth/register')
      .send({ username: '', password: 'testPass', admin: 'No admin' });
    expect(response.status).toBe(400);
    expect(response.text).toBe('{"message":"Username is missing or empty.","status":400}');
    done();
  });

  it('should return 400 if no password is entered', async done => {
    const response = await server
      .post('/auth/register')
      .send({ username: 'mundle chubbins', password: '', admin: 'No admin' });
    expect(response.status).toBe(400);
    expect(response.text).toBe('{"message":"Password is missing or empty.","status":400}');
    done();
  });

  it('should return 400 if password is not long enough', async done => {
    const response = await server.post('/auth/register').send({ username: '', password: 'bob', admin: 'No admin' });
    expect(response.status).toBe(400);
    expect(response.text).toBe('{"message":"Username is missing or empty.","status":400}');
    done();
  });
});
