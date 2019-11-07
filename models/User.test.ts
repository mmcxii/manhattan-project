import { User, IUserDocument } from './User';
import mongoose from 'mongoose';
import { ObjectID } from 'bson';
declare global {
  namespace NodeJS {
    interface Global {
      __MONGO_URI__: any;
    }
  }
}
const userData = {
  username: 'test1',
  admin: 'Not Admin',
  follows: [new ObjectID()],
  followers: [new ObjectID()],
  theme: 'light',
  highlightedFavorite: new ObjectID(),
  password: 'testpass',
  name: 'zach attack',
  age: 4,
  bio: 'im 4'
};

describe('User Modal Test', () => {
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
  //test if model works
  it('create & save a populated user', async done => {
    const validUser: IUserDocument = new User(userData);
    const savedUser = await validUser.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedUser._id).toBeDefined();
    expect(savedUser.username).toBe(userData.username);
    expect(savedUser.follows).toEqual(expect.arrayContaining(userData.follows));
    expect(savedUser.followers).toEqual(
      expect.arrayContaining(userData.followers)
    );
    expect(savedUser.theme).toBe(userData.theme);
    expect(savedUser.highlightedFavorite).toBe(userData.highlightedFavorite);
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.age).toBe(userData.age);
    expect(savedUser.bio).toBe(userData.bio);
    done();
  });
  // Test Schema is working
  it('insert user but any undefined field in shema should result in undefined', async done => {
    const userWithInvalidField: IUserDocument = new User({
      username: 'Testman',
      password: 'meh',
      admin: 'Not Admin',
      nickname: 'billy'
    });
    const savedUserWithInvalidField = await userWithInvalidField.save();
    expect(savedUserWithInvalidField._id).toBeDefined();
    //@ts-ignore
    expect(savedUserWithInvalidField.nickkname).toBeUndefined();
    done();
  });

  // Test Validation is working
  it('creating a user without a required field should fail', async done => {
    const userWithoutRequiredField = new User({ username: 'Testman' });
    let err;
    try {
      const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
      //@ts-ignore
      error = savedUserWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.password).toBeDefined();
    done();
  });
});
