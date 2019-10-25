import { Schema, SchemaTypes as Types, Model, model, Document } from 'mongoose';
import { IUser, IUpdateContext } from '../interfaces';

// User DTO class
export class UserData {
  username: string;
  follows: number;
  followers: number;
  theme?: 'dark' | 'light';
  highlightedFavorite?: string;
  name?: string;
  age?: number;
  bio?: string;

  constructor(user: IUser) {
    this.username = user.username;
    this.follows = user.follows.length;
    this.followers = user.followers.length;
    this.theme = user.theme;
    this.highlightedFavorite = user.highlightedFavorite;
    this.name = user.name;
    this.age = user.age;
    this.bio = user.bio;
  }
}

// Create interface for User documents
export interface IUserDocument extends IUser, Document {
  // TODO - define user document methods
  password: string;
  admin: string;
  follows: IUserDocument[];
  followers: IUserDocument[];
  toUserData: () => UserData;
  addFollower: (follower: IUserDocument) => Promise<number>;
  removeFollower: (follower: IUserDocument) => Promise<number>;
}

// Create interface for User model
export interface IUserModel extends Model<IUserDocument> {
  getUserAndFollower: (
    username: string,
    followerName: string
  ) => Promise<[IUserDocument, IUserDocument] | Error>;
}

const userSchema = new Schema({
  username: {
    type: Types.String,
    required: true,
    unique: true
  },
  password: {
    type: Types.String,
    required: true
  },
  admin: {
    type: Types.String,
    required: true,
<<<<<<< HEAD
    default: 'notAdmin'
=======
    default: 'notAdmin',
>>>>>>> f9264b9a9a8bbfc528ab14f5eeac53d20712202a
  },
  name: Types.String,
  age: Types.Number,
  bio: Types.String,
<<<<<<< HEAD
  highlightedFavorite: Types.String,
  theme: {
    type: Types.String,
    required: true,
    default: 'dark'
  },
  follows: {
    type: [Types.ObjectId],
    ref: 'User'
  },
  followers: {
    type: [Types.ObjectId],
    ref: 'User'
=======
  follows: {
    type: [Types.ObjectId],
    ref: "User"
  },
  followers: {
    type: [Types.ObjectId],
    ref: "User"
  },
  favorites: {
    type: [Types.ObjectId],
    ref: "Product"
  },
  highlightedFavorite: {
    type: Types.ObjectId,
    ref: "Product"
  },
  theme: {
    type: Types.String,
    required: true,
    default: 'dark',
>>>>>>> f9264b9a9a8bbfc528ab14f5eeac53d20712202a
  }
});

// Schema methods

userSchema.statics.getUserAndFollower = async function(
  username: string,
  followerName: string
): Promise<[IUserDocument, IUserDocument] | Error> {
  // Find both user documents
  const users: IUserDocument[] = await User.find({
    username: [username, followerName]
  });

  // Match user documents on username
  const user: IUserDocument | undefined = users.find(
    u => u.username === username
  );
  const follower: IUserDocument | undefined = users.find(
    u => u.username === followerName
  );

  // Return error if one or both documents not found
  if (!follower || !user) {
    const name = !user ? username : followerName;
    return new Error(`User not found: ${name}`);
  }

  // Return both User documents in a tuple (User,Follower)
  return [user, follower];
};

// Document methods

// Uses the provided IUpdateContext to perform User document updates
const updateFollowers = async (
  ...updateContext: IUpdateContext[]
): Promise<number> => {
  // Get User/Follower update results and return appropriate status
  const results = await Promise.all(
    updateContext.map(u => User.updateOne(u.filter, u.options))
  );

  const allOk = results.every(result => result.ok === 1);

  return allOk ? 200 : 202;
};

// Transforms current User document into UserData instance
userSchema.methods.toUserData = function(this: IUser): UserData {
  return new UserData(this);
};

// Adds a follower to the current user
userSchema.methods.addFollower = async function(
  this: IUserDocument,
  follower: IUserDocument
): Promise<number> {
  // Add follower to user
  const userContext: IUpdateContext = {
    filter: { _id: this._id },
    options: { $addToSet: { followers: follower._id } }
  };

  // Add user to follows
  const followerContext: IUpdateContext = {
    filter: { _id: follower._id },
    options: { $addToSet: { follows: this._id } }
  };

  return updateFollowers(userContext, followerContext);
};

// Removes a follower from current User
userSchema.methods.removeFollower = async function(
  this: IUserDocument,
  follower: IUserDocument
): Promise<number> {
  // Remove follower from followers
  const userContext: IUpdateContext = {
    filter: { _id: this._id },
    options: { $pull: { followers: follower._id } }
  };

  // Remove user from follows
  const followerContext: IUpdateContext = {
    filter: { _id: follower._id },
    options: { $pull: { follows: this._id } }
  };

  return updateFollowers(userContext, followerContext);
};

<<<<<<< HEAD
export const User = model<IUserDocument, IUserModel>('User', userSchema);
=======
export const User = model<IUserDocument, IUserModel>('User', userSchema);
>>>>>>> f9264b9a9a8bbfc528ab14f5eeac53d20712202a
