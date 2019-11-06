import { Schema, SchemaTypes as Types, Model, model, Document, QueryUpdateOptions } from 'mongoose';
import { IComment, IUser, IProduct } from '../interfaces';
import { User, IUserDocument, UserData } from '../models';
import { ObjectID } from 'bson';

// Create interface for Comment documents
export interface ICommentDocument extends IComment, Document {
  upvote(user: IUserDocument): Promise<number | Error>;
  downvote(user: IUserDocument): Promise<number | Error>;
}

// Create interface for Comment model
export interface ICommentModel extends Model<ICommentDocument> {
  createComment(username: string, comment: string, product: string): Promise<ICommentDocument | Error>;
}

//Comment DTO class

export class CommentData {
  author: UserData;
  downvotes: IUser[];
  upvotes: IUser[];
  _id: string;
  product: IProduct;
  rating: number;

  constructor(comment: ICommentDocument, user: IUserDocument) {
    this.author = new UserData(user);
    this.downvotes = comment.downvotes;
    this.upvotes = comment.upvotes;
    this._id = comment._id;
    this.product = comment.product;
    this.rating = comment.rating || 0;
  }
}

const commentSchema = new Schema({
  author: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: Types.ObjectId,
    ref: 'Product',
    required: true
  },
  text: {
    type: Types.String,
    required: true
  },
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
  ]
});

commentSchema.virtual('rating').get(function(this: { downvotes: ObjectID[]; upvotes: ObjectID[] }): number {
  const upvotes: number = this.upvotes.length;
  const downvotes: number = this.downvotes.length;
  return upvotes - downvotes;
});

commentSchema.pre('find', function(next: () => void) {
  this.populate('author');
  next();
});

commentSchema.pre('findOne', function(next: () => void) {
  this.populate('author');
  next();
});

commentSchema.virtual('rating').get(function(this: { downvotes: ObjectID[]; upvotes: ObjectID[] }): number {
  const upvotes: number = this.upvotes.length;
  const downvotes: number = this.downvotes.length;
  // Represent rating as a percentage (0.0 -> 1.0);
  return upvotes / (upvotes + downvotes);
});

// Comment schema method to create a new comment
commentSchema.statics.createComment = async function(
  username: string,
  comment: string,
  product: string
): Promise<ICommentDocument | Error> {
  const user: IUserDocument | null = await User.findOne({ username });

  if (!user) {
    return Promise.resolve(new Error(`User ${username} not found.`));
  }

  const text = comment.trim();

  const newComment = await this.create({ author: user._id, text, product: product });

  return newComment.populate('author').execPopulate();
};

// User upvoting comment
commentSchema.methods.upvote = async function(this: { _id: ObjectID }, user: IUserDocument): Promise<number | Error> {
  // Create query update uptions to add user id to upvotes and remove from downvotes
  const options: QueryUpdateOptions = {
    $pull: { downvotes: user._id },
    $addToSet: { upvotes: user._id }
  };

  return updateVotes(this._id, options, 'upvote');
};

// User downvoting comment
commentSchema.methods.downvote = async function(this: { _id: ObjectID }, user: IUserDocument): Promise<number | Error> {
  // Create query update uptions to add user id to downvotes and remove from upvotes
  const options: QueryUpdateOptions = {
    $pull: { upvotes: user._id },
    $addToSet: { downvotes: user._id }
  };

  return updateVotes(this._id, options, 'downvote');
};

// Updates a comment's rating
const updateVotes = async function(
  id: ObjectID,
  options: QueryUpdateOptions,
  type: 'upvote' | 'downvote'
): Promise<number | Error> {
  let comment: ICommentDocument | null;
  try {
    comment = await Comment.findOneAndUpdate({ _id: id }, options, { new: true });

    if (!comment) {
      return new Error(`Comment ${id} not found.`);
    }
  } catch (error) {
    return new Error(`Could not update comment votes: ${error}`);
  }

  return comment.rating;
};

export const Comment = model<ICommentDocument, ICommentModel>('Comment', commentSchema);
