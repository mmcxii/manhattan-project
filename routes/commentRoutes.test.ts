let app = require('../server');
import mongoose from 'mongoose';
import request from 'supertest';
import { ObjectID } from 'bson';
//adding mongo uri to be a global type
declare global {
  namespace NodeJS {
    interface Global {
      __MONGO_URI__: any;
    }
  }
}

let server = request.agent(app);

describe('comment routes', () => {
  let token: any = null;
  beforeAll(async done => {
    await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, err => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });

    server
      .post('/auth/register')
      .send({ username: 'test', password: 'test', admin: 'Not admin' })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        token = res.body.token;
      });
    done();
  });
  it('should create a comment', async done => {
    const response = await server
      .post('/api/comments')
      .send({ text: 'this is a comment', author: new ObjectID() })
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer' + token);
    expect(response.status).toBe(200);
    done();
  });

  it('should get all comments', async done => {
    const response = await server.get('/api/comments').set('Accept', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body[0].text).toBe('this is a comment');
    done();
  });
  afterAll(() => {
    mongoose.disconnect();
  });
});
