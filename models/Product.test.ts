import { Product, IProductDocument } from './Product';
import mongoose from 'mongoose';
import { ObjectID } from 'bson';
declare global {
  namespace NodeJS {
    interface Global {
      __MONGO_URI__: any;
    }
  }
}

const beerData = {
  extID: 'someBeerID',
  type: 'BEER',
  name: 'Budweiser',
  imgUrl: 'someURL',
  comments: [new ObjectID()],
  upvotes: [new ObjectID()],
  downvotes: [new ObjectID()],
  details: {
    subType: 'ale',
    desc: 'water',
    ABV: 20,
    organic: false
  }
};
const mixedData = {
  extID: 'some mixed ID',
  type: 'MIXED',
  name: 'vodka',
  imgUrl: 'vodka picture',
  comments: [new ObjectID()],
  upvotes: [new ObjectID()],
  downvotes: [new ObjectID()],
  details: {
    ingredients: [{ name: 'vodka', measurement: '1oz' }],
    directions: 'put the lime in the coconut and shake it all up',
    glassType: 'coconut'
  }
};

describe('Product model tests', () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, err => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  });

  //Beer tests
  it('adds a beer product', async done => {
    const validBeer: IProductDocument = new Product(beerData);
    const savedBeer = await validBeer.save();
    expect(savedBeer.extID).toBe(validBeer.extID);
    expect(savedBeer.type).toBe(validBeer.type);
    expect(savedBeer.name).toBe(validBeer.name);
    expect(savedBeer.imgUrl).toBe(validBeer.imgUrl);
    expect(savedBeer.comments).toBe(validBeer.comments);
    expect(savedBeer.upvotes).toBe(validBeer.upvotes);
    expect(savedBeer.downvotes).toBe(validBeer.downvotes);
    expect(savedBeer.details.subType).toBe(validBeer.details.subType);
    expect(savedBeer.details.desc).toBe(validBeer.details.desc);
    expect(savedBeer.details.ABV).toBe(validBeer.details.ABV);
    expect(savedBeer.details.organic).toBe(validBeer.details.organic);
    done();
  });

  it('Should result in undefined for any field not in beer schema', async done => {
    const undefinedBeerData: IProductDocument = new Product({
      extID: 'badBeer',
      type: 'BEER',
      name: 'BadBeerStuff',
      imgUrl: 'someURL',
      comments: [new ObjectID()],
      upvotes: [new ObjectID()],
      downvotes: [new ObjectID()],
      random: 'some random stuff',
      details: {
        subType: 'ale',
        desc: 'water',
        ABV: 20,
        organic: false
      }
    });
    const savedUndefinedBeerData = await undefinedBeerData.save();
    expect(savedUndefinedBeerData._id).toBeDefined();
    //@ts-ignore
    expect(savedUndefinedBeerData.random).toBeUndefined();
    done();
  });

  it('Should fail if missing required  beer field', async done => {
    const invalidBeerData: IProductDocument = new Product({
      type: 'BEER',
      name: 'BadBeerStuff',
      imgUrl: 'someURL',
      comments: [new ObjectID()],
      upvotes: [new ObjectID()],
      downvotes: [new ObjectID()],
      details: {
        subType: 'ale',
        desc: 'water',
        ABV: 20,
        organic: false
      }
    });

    let err: any;
    try {
      const savedInvalidBeerData = await invalidBeerData.save();
      //@ts-ignore
      error = savedInvalidBeerData;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.extID).toBeDefined();
    done();
  });
  //Mixed Tests
  it('adds a mixed product', async done => {
    const validMixed: IProductDocument = new Product(mixedData);
    const savedMixed = await validMixed.save();
    expect(savedMixed.extID).toBe(validMixed.extID);
    expect(savedMixed.type).toBe(validMixed.type);
    expect(savedMixed.name).toBe(validMixed.name);
    expect(savedMixed.imgUrl).toBe(validMixed.imgUrl);
    expect(savedMixed.comments).toBe(validMixed.comments);
    expect(savedMixed.upvotes).toBe(validMixed.upvotes);
    expect(savedMixed.downvotes).toBe(validMixed.downvotes);
    expect(savedMixed.details.ingredients).toBe(validMixed.details.ingredients);
    expect(savedMixed.details.glassType).toBe(validMixed.details.glassType);
    expect(savedMixed.details.directions).toBe(validMixed.details.directions);
    done();
  });

  it('Should result in undefined for any field not in mixed schema', async done => {
    const undefinedMixedData: IProductDocument = new Product({
      extID: 'some bad ID',
      name: 'vodka',
      type: 'MIXED',
      imgUrl: 'vodka picture',
      comments: [new ObjectID()],
      upvotes: [new ObjectID()],
      downvotes: [new ObjectID()],
      random: 'stuff',
      details: {
        ingredients: [{ name: 'vodka', measurement: '1oz' }],
        directions: 'put the lime in the coconut and shake it all up',
        glassType: 'coconut'
      }
    });
    const savedUndefinedMixedData = await undefinedMixedData.save();
    expect(savedUndefinedMixedData._id).toBeDefined();
    //@ts-ignore
    expect(savedUndefinedMixedData.random).toBeUndefined();
    done();
  });

  it('Should fail if missing required mixed field', async done => {
    const invalidMixedData: IProductDocument = new Product({
      name: 'vodka',
      type: 'MIXED',
      imgUrl: 'vodka picture',
      comments: [new ObjectID()],
      upvotes: [new ObjectID()],
      downvotes: [new ObjectID()],
      details: {
        ingredients: [{ name: 'vodka', measurement: '1oz' }],
        directions: 'put the lime in the coconut and shake it all up',
        glassType: 'coconut'
      }
    });

    let err: any;
    try {
      const savedInvalidMixedData = await invalidMixedData.save();
      //@ts-ignore
      error = savedInvalidMixedData;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.extID).toBeDefined();
    done();
  });
});
