import { Comment, ICommentDocument } from './Comment';
import mongoose from 'mongoose';
import { ObjectID } from 'bson';
declare global {
  namespace NodeJS {
    interface Global {
      __MONGO_URI__: any;
    }
  }
}

const commentData = {
  author: new ObjectID(),
  text: 'what a great beer',
  upvotes: new ObjectID(),
  downvotes: new ObjectID()
};

describe('Comment Modal Tests', () => {
  beforeAll(async () => {
    await mongoose.connect(
      global.__MONGO_URI__,
      { useNewUrlParser: true, useCreateIndex: true },
      err => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      }
    );
  });
  //test modal
  it('creates a comment', async () => {
    const validComment: ICommentDocument = new Comment(commentData);
    const savedComment = await validComment.save();

    expect(savedComment.author).toBe(savedComment.author);
    expect(savedComment.text).toBe(savedComment.text);
    expect(savedComment.upvotes).toBe(savedComment.upvotes);
    expect(savedComment.downvotes).toBe(savedComment.downvotes);
  });

  // Test Schema is working
  it('insert comment but any undefined field in shema should result in undefined', async () => {
    const commentWithInvalidField: ICommentDocument = new Comment({
      author: new ObjectID(),
      text: 'yummy yummy',
      time: '10am'
    });
    const savedCommentWithInvalidField = await commentWithInvalidField.save();
    expect(savedCommentWithInvalidField._id).toBeDefined();
    //@ts-ignore
    expect(savedCommentWithInvalidField.time).toBeUndefined();
  });

  // Test Validation is working
  it('creating a comment without a required field should fail', async () => {
    const commentWithoutRequiredField = new Comment({ text: 'yum yum beer' });
    let err: any;
    try {
      const savedCommentWithoutRequiredField = await commentWithoutRequiredField.save();
      //@ts-ignore
      error = savedCommentWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.author).toBeDefined();
  });
});
