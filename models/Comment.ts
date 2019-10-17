import { Schema, SchemaTypes as Types, Model, model, Document, QueryUpdateOptions } from 'mongoose';
import { IComment } from '../interfaces/IComment';
import { User, IUserDocument } from '../models/User';

// Create interface for Comment documents
export interface ICommentDocument extends IComment, Document {
  upvote(user: IUserDocument): Promise<number>;
  downvote(user: IUserDocument): Promise<number>;
}

// Create interface for Comment model
export interface ICommentModel extends Model<ICommentDocument> {
  createComment(username: string, comment: string): Promise<ICommentDocument | Error>;
}

const commentSchema = new Schema({
  author: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: Types.String,
    required: true
  },
  rating: {
    type: Types.Number,
    default: 0
  }
});

// Comment schema method to create a new comment
commentSchema.static('createComment', async function(
  username: string,
  comment: string
): Promise<ICommentDocument | Error> {
  const user: IUserDocument | null = await User.findOne({ username });

  if (!user) {
    return Promise.resolve(new Error(`User ${username} not found.`));
  }

  const text = comment.trim().toLowerCase();

  return Comment.create({ author: user._id, text });
});

// User upvoting comment
commentSchema.methods.upvote = async function(user: IUserDocument): Promise<number> {
  // TODO - record which users upvote/downvote, validate passed in user

  return updateRating(this._id, { $inc: { rating: 1 } });
};

// User downvoting comment
commentSchema.methods.downvote = async function(user: IUserDocument): Promise<number> {
  // TODO - record which users upvote/downvote, validate passed in user

  return updateRating(this._id, { $inc: { rating: -1 } });
};

// Updates a comment's rating
const updateRating = async function(id: any, options: QueryUpdateOptions): Promise<number> {
  const result = await Comment.updateOne({ _id: id }, options);

  if (!result || !result.ok) {
    return 500;
  }

  return result.ok > 0 ? 200 : 202;
};

export const Comment = model<ICommentDocument, ICommentModel>('Comment', commentSchema);
