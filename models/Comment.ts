import { Schema, SchemaTypes as Types, Model, model, Document, QueryUpdateOptions } from 'mongoose';
import { IComment } from '../interfaces/IComment';
import { User, IUserDocument } from '../models/User';
import { ObjectID } from 'bson';

// Create interface for Comment documents
export interface ICommentDocument extends IComment, Document {
  upvote(user: IUserDocument): Promise<number | Error>;
  downvote(user: IUserDocument): Promise<number | Error>;
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

commentSchema
  .virtual('rating')
  .get(function(this: { downvotes: ObjectID[]; upvotes: ObjectID[] }): number {
    const upvotes: number = this.upvotes.length;
    const downvotes: number = this.downvotes.length;
    // Represent rating as a percentage (0.0 -> 1.0);
    return upvotes / (upvotes + downvotes);
  });

// Comment schema method to create a new comment
commentSchema.statics.createComment = async function(
  username: string,
  comment: string
): Promise<ICommentDocument | Error> {
  const user: IUserDocument | null = await User.findOne({ username });

  if (!user) {
    return Promise.resolve(new Error(`User ${username} not found.`));
  }

  const text = comment.trim();

  return Comment.create({ author: user._id, text });
};

// User upvoting comment
commentSchema.methods.upvote = async function(
  this: { _id: ObjectID },
  user: IUserDocument
): Promise<number | Error> {
  // Create query update uptions to add user id to upvotes and remove from downvotes
  const options: QueryUpdateOptions = {
    $pull: { downvotes: user._id },
    $addToSet: { upvotes: user._id }
  };

  return updateVotes(this._id, options, 'upvote');
};

// User downvoting comment
commentSchema.methods.downvote = async function(
  this: { _id: ObjectID },
  user: IUserDocument
): Promise<number | Error> {
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

  return type === 'upvote' ? comment.upvotes.length : comment.downvotes.length;
};

export const Comment = model<ICommentDocument, ICommentModel>('Comment', commentSchema);
