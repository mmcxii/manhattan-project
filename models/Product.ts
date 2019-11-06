import { Schema, SchemaTypes as Types, Model, model, Document, QueryUpdateOptions } from 'mongoose';
import { IUserDocument, UserData } from './User';
import { IProduct, ProductType, IProductDetails } from '../interfaces';
import { ObjectID } from 'bson';
import { CommentData } from './Comment';

export interface IProductDocument extends IProduct, Document {
  upvote(user: IUserDocument): Promise<IProductDocument>;
  downvote(user: IUserDocument): Promise<IProductDocument>;
}

export interface IProductModel extends Model<IProductDocument> {
  // TODO - define Product model methods
}

export class ProductData {
  extID: string;
  type: ProductType;
  detail: IProductDetails;
  imageUrls: string[];
  comments: CommentData[];
  upvotes: UserData[];
  downvotes: UserData[];
  rating: number;

  constructor(product: IProductDocument) {
    this.extID = product.extID;
    this.type = product.type;
    this.imageUrls = product.imageUrls;
    this.comments = product.comments.map(c => new CommentData(c, c.author));
    this.upvotes = product.upvotes.map(u => new UserData(u));
    this.downvotes = product.downvotes.map(d => new UserData(d));
    this.detail = product.detail;
    this.rating = product.rating;
  }
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
  return upvotes - downvotes;
});

// Updates a products's rating
const updateVotes = async function(id: ObjectID, options: QueryUpdateOptions): Promise<IProductDocument> {
  let product: IProductDocument | null;
  try {
    product = await Product.findOneAndUpdate({ _id: id }, options, { new: true });

    if (product == null) {
      throw new Error(`Product ${id} not found.`);
    }
  } catch (error) {
    throw new Error(`Could not update product votes: ${error}.`);
  }

  return product;
};

// User upvoting product
productSchema.methods.upvote = async function(this: { _id: ObjectID }, user: IUserDocument): Promise<IProductDocument> {
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
): Promise<IProductDocument> {
  // Create query update uptions to add user id to downvotes and remove from upvotes
  const options: QueryUpdateOptions = {
    $pull: { upvotes: user._id },
    $addToSet: { downvotes: user._id }
  };

  return updateVotes(this._id, options);
};

// Export model
export const Product = model<IProductDocument, IProductModel>('Product', productSchema);
