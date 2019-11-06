import { Schema, SchemaTypes as Types, Model, model, Document, QueryUpdateOptions } from 'mongoose';
import { IUserDocument, UserData } from './User';
import { IProduct, ProductType, IProductDetails } from '../interfaces';
import { ObjectID, ObjectId } from 'bson';
import { CommentData } from './Comment';

export interface IProductDocument extends IProduct, Document {
  upvote(user: IUserDocument): Promise<IProductDocument>;
  downvote(user: IUserDocument): Promise<IProductDocument>;
}

export interface IProductModel extends Model<IProductDocument> {
  // TODO - define Product model methods
}

export class ProductData {
  type: ProductType;
  name: string;
  imgUrl: string;
  details: IProductDetails;
  imageUrls: string[];
  comments: CommentData[];
  rating: number;
  upvotes: ObjectId[];
  downvotes: ObjectId[];

  constructor(product: IProductDocument) {
    this.type = product.type;
    this.name = product.name;
    this.imgUrl = product.imgUrl;
    this.imageUrls = product.imageUrls;
    this.details = product.details;
    this.rating = product.rating;

    // Init arrays to empty. Populate if necessary.
    this.upvotes = [];
    this.downvotes = [];
    this.comments = [];

    if (product.upvotes && product.upvotes.length > 0) {
      this.upvotes = product.upvotes.map(u => u._id);
    }
    if (product.downvotes && product.downvotes.length > 0) {
      this.downvotes = product.downvotes.map(u => u._id);
    }
    if (product.comments && product.comments.length > 0) {
      this.comments = product.comments.map(c => new CommentData(c, c.author));
    }
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
