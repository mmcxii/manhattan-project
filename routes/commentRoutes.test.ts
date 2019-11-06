let app = require('../server');
import mongoose from 'mongoose';
import request from 'supertest';
import { Comment, Product } from '../models';

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
let token: any;
let productID: any;
describe('comment routes', () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, err => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
    const response = await server
      .post('/auth/register')
      .send({ username: 'test', password: 'test', admin: 'Not admin' });
    token = response.body.token;

    productID = await Product.find({});
  });

  //post / tests

  it('should create a comment', async done => {
    const response = await server
      .post('/api/comments')
      .send({ text: 'this is a comment', author: 'test', product: new ObjectID() })
      .set('Authorization', 'bearer ' + token);
    expect(response.status).toBe(200);
    expect(response.body.text).toBe('this is a comment');
    expect(response.body.author).toBeDefined();
    done();
  });

  it('should return 400 if no text is entered', async done => {
    const response = await server
      .post('/api/comments')
      .send({ text: '', author: 'test', product: productID[0]._id })
      .set('Authorization', 'bearer ' + token);
    expect(response.status).toBe(400);
    done();
  });

  it('should return 400 if no author is entered', async done => {
    const response = await server
      .post('/api/comments')
      .send({ text: 'this is some text', author: '', product: productID[0]._id })
      .set('Authorization', 'bearer ' + token);
    expect(response.status).toBe(400);
    done();
  });

  //get / tests

  it('should get all comments', async done => {
    const response = await server.get('/api/comments').set('Accept', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(1);
    expect(response.body[2].text).toBe('this is a comment');
    done();
  });

  //get /:id tests

  it('should find a comment by its ID', async done => {
    //Find the new comment to use its ID
    const comment = await Comment.findOne({ text: 'this is a comment' });
    if (!comment) {
      throw 404;
    }
    const response = await server.get(`/api/comments/${comment._id}`).set('Accept', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body.text).toBe('this is a comment');
    done();
  });

  //get /:id/upvotes tests

  it('Should get comment upvotes', async done => {
    const comment = await Comment.findOne({ text: 'this is a comment' });
    if (!comment) {
      throw 404;
    }
    const response = await server.get(`/api/comments/${comment._id}/upvotes`).set('Accept', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    done();
  });

  //get /:id/downvotes

  it('Should get comment downvotes', async done => {
    const comment = await Comment.findOne({ text: 'this is a comment' });
    if (!comment) {
      throw 404;
    }
    const response = await server.get(`/api/comments/${comment._id}/downvotes`).set('Accept', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    done();
  });
  //update upvotes tests
  it('Should update upvotes on user', async done => {
    const comment = await Comment.findOne({ text: 'this is a comment' });
    if (!comment) {
      throw 404;
    }
    const response = await server
      .put(`/api/comments/${comment._id}/upvotes`)
      .send({ username: 'test' })
      .set('Authorization', 'bearer ' + token);
    expect(response.status).toBe(200);
    const upvote = await Comment.findOne({ text: 'this is a comment' });
    if (!upvote) {
      return 404;
    }
    expect(upvote.upvotes.length).toBeGreaterThanOrEqual(1);
    done();
  });

  it('Should throw 400 for no username', async done => {
    const comment = await Comment.findOne({ text: 'this is a comment' });
    if (!comment) {
      throw 404;
    }
    const response = await server
      .put(`/api/comments/${comment._id}/upvotes`)
      .send({ username: '' })
      .set('Authorization', 'bearer ' + token);
    expect(response.status).toBe(400);
    done();
  });

  it('Should throw 404 for no user', async done => {
    const comment = await Comment.findOne({ text: 'this is a comment' });
    if (!comment) {
      throw 404;
    }
    const response = await server
      .put(`/api/comments/${comment._id}/upvotes`)
      .send({ username: 'randonamethatdoesntworkatall' })
      .set('Authorization', 'bearer ' + token);
    expect(response.status).toBe(404);
    done();
  });

  it('Should throw 404 for no comment', async done => {
    const fakeCommentID = new ObjectID();
    const response = await server
      .put(`/api/comments/${fakeCommentID}/upvotes`)
      .send({ username: 'test' })
      .set('Authorization', 'bearer ' + token);
    expect(response.status).toBe(404);
    done();
  });

  //update downvotes tests
  it('Should update downvotes on user', async done => {
    const comment = await Comment.findOne({ text: 'this is a comment' });
    if (!comment) {
      throw 404;
    }
    const response = await server
      .put(`/api/comments/${comment._id}/downvotes`)
      .send({ username: 'test' })
      .set('Authorization', 'bearer ' + token);
    expect(response.status).toBe(200);
    const downvote = await Comment.findOne({ text: 'this is a comment' });
    if (!downvote) {
      return 404;
    }
    expect(downvote.downvotes.length).toBeGreaterThanOrEqual(1);
    done();
  });

  it('Should throw 400 for no username', async done => {
    const comment = await Comment.findOne({ text: 'this is a comment' });
    if (!comment) {
      throw 404;
    }
    const response = await server
      .put(`/api/comments/${comment._id}/downvotes`)
      .send({ username: '' })
      .set('Authorization', 'bearer ' + token);
    expect(response.status).toBe(400);
    done();
  });

  it('Should throw 404 for no user', async done => {
    const comment = await Comment.findOne({ text: 'this is a comment' });
    if (!comment) {
      throw 404;
    }
    const response = await server
      .put(`/api/comments/${comment._id}/downvotes`)
      .send({ username: 'randonamethatdoesntworkatall' })
      .set('Authorization', 'bearer ' + token);
    expect(response.status).toBe(404);
    done();
  });

  it('Should throw 404 for no comment', async done => {
    const fakeCommentID = new ObjectID();
    const response = await server
      .put(`/api/comments/${fakeCommentID}/downvotes`)
      .send({ username: 'test' })
      .set('Authorization', 'bearer ' + token);
    expect(response.status).toBe(404);
    done();
  });

  afterAll(() => {
    mongoose.disconnect();
  });
});
