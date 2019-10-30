import app from './index';
import mongoose from 'mongoose';
import supertest from 'supertest';

//adding mongo uri to be a global type
declare global {
  namespace NodeJS {
    interface Global {
      __MONGO_URI__: any;
    }
  }
}

const request = supertest(app);

describe('comment routes', () => {
  it('checks to see if we are getting back comments', async done => {
    const response = await request.get('/comments').set('Accept', 'application/json');
    expect(response.status).toBe(200);
    done();
  });
});
