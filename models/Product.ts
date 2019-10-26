import { Schema, SchemaTypes as Types, Model, model, Document } from 'mongoose';
import { IProduct } from '../interfaces';
import { ObjectID } from 'bson';

export interface IProductDocument extends IProduct, Document {
  // TODO - define Product document methods
}

export interface IProductModel extends Model<IProductDocument> {
  // TODO - define Product model methods
}

const ingredientsSchema = new Schema({
  name: Types.String,
  measurement: Types.String
});

const productDetailsSchema = new Schema({
  subType: Types.String,
  ingredients: [ingredientsSchema],
  directions: Types.String,
  glassType: Types.String,
  ABV: Types.Number,
  desc: Types.String,
  organic: Types.Boolean
});

const productSchema = new Schema({
  extID: {
    type: Types.String,
    required: true,
    unique: true
  },
  type: {
    type: Types.String,
    enum: ['BEER', 'WINE', 'MIXED'],
    required: true
  },
  name: {
    type: Types.String,
    required: true,
    text: true
  },
  desc: Types.String,
  imgUrl: Types.String,
  comments: [{ type: Types.ObjectId, ref: 'Comment' }],
  upvotes: [
    {
      type: Types.ObjectId,
      ref: 'User'
    }
  ],
  downvotes: [
    {
      type: Types.ObjectId,
      ref: 'User'
    }
  ],
  details: productDetailsSchema
});

productSchema
  .virtual('rating')
  .get(function(this: { downvotes: ObjectID[]; upvotes: ObjectID[] }): number {
    const upvotes: number = this.upvotes.length;
    const downvotes: number = this.downvotes.length;
    // Represent rating as a percentage (0.0 -> 1.0);
    return upvotes / (upvotes + downvotes);
  });

export const Product = model<IProductDocument, IProductModel>(
  'Product',
  productSchema
);
