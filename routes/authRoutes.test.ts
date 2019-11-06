const app = require('../server');
import mongoose from 'mongoose';
import request from 'supertest';
import { User, IUserDocument } from '../models';

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
    const userData: IUserDocument[] = await User.find({ username: 'johns the best' });
    expect(userData).toBeDefined();
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

  it('should return 422 if username is already used', async done => {
    const response = await server
      .post('/auth/register')
      .send({ username: 'Johns the best', password: 'testPass', admin: 'No admin' });
    expect(response.status).toBe(422);
    expect(response.text).toBe('{"message":"Username already exists!","status":422}');
    done();
  });

  //login tests

  it('should log a user in', async done => {
    const response = await server.post('/auth/login').send({ username: 'johns the best', password: 'testPass' });
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
    done();
  });

  it('should return 400 if no data is sent in', async done => {
    const response = await server.post('/auth/login').send();
    expect(response.status).toBe(400);
    expect(response.text).toBe('{"message":"Username is empty or missing.","status":400}');
    done();
  });

  it('should return 400 if no username is sent', async done => {
    const response = await server.post('/auth/login').send({ username: '', password: 'testPass' });
    expect(response.status).toBe(400);
    expect(response.text).toBe('{"message":"Username is empty or missing.","status":400}');
    done();
  });

  it('should return 400 if no password is sent', async done => {
    const response = await server.post('/auth/login').send({ username: 'johns the best', password: '' });
    expect(response.status).toBe(400);
    expect(response.text).toBe('{"message":"Password is empty or missing.","status":400}');
    done();
  });

  it('should return 404 if user cant be found', async done => {
    const response = await server.post('/auth/login').send({ username: 'someusername', password: 'testPass' });
    expect(response.status).toBe(404);
    expect(response.text).toBe('{"message":"Username does not exist.","status":404}');
    done();
  });

  it('should return 401 if password does not match', async done => {
    const response = await server.post('/auth/login').send({ username: 'johns the best', password: 'wrongPass' });
    expect(response.status).toBe(401);
    expect(response.text).toBe('{"message":"Password incorrect.","status":401}');
    done();
  });

  //:username Routes

  it('should return user if username and token match', async done => {
    const response = await server.post(`/auth/${'johns the best'}`).send({});
  });
});
