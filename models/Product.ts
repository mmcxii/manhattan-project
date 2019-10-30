import { Schema, SchemaTypes as Types, Model, model, Document, QueryUpdateOptions } from 'mongoose';
import { IUserDocument } from './User';
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

productSchema.virtual('rating').get(function(this: { downvotes: ObjectID[]; upvotes: ObjectID[] }): number {
  const upvotes: number = this.upvotes.length;
  const downvotes: number = this.downvotes.length;
  // Represent rating as a percentage (0.0 -> 1.0);
  return upvotes / (upvotes + downvotes);
});

// Updates a products's rating
const updateVotes = async function(id: ObjectID, options: QueryUpdateOptions): Promise<IProductDocument | Error> {
  let product: IProductDocument | null;
  try {
    product = await Product.findOneAndUpdate({ _id: id }, options, { new: true });

    if (product == null) {
      return new Error(`Product ${id} not found.`);
    }
  } catch (error) {
    return new Error(`Could not update product votes: ${error}`);
  }

  return product;
};

// User upvoting product
productSchema.methods.upvote = async function(
  this: { _id: ObjectID },
  user: IUserDocument
): Promise<IProductDocument | Error> {
  // Create query update uptions to add user id to upvotes and remove from downvotes
  const options: QueryUpdateOptions = {
    $pull: { downvotes: user._id },
    $addToSet: { upvotes: user._id }
  };

  return updateVotes(this._id, options);
};

// User downvoting product
productSchema.methods.downvote = async function(
  this: { _id: ObjectID },
  user: IUserDocument
): Promise<IProductDocument | Error> {
  // Create query update uptions to add user id to downvotes and remove from upvotes
  const options: QueryUpdateOptions = {
    $pull: { upvotes: user._id },
    $addToSet: { downvotes: user._id }
  };

  return updateVotes(this._id, options);
};

export const Product = model<IProductDocument, IProductModel>('Product', productSchema);
