import { Schema, SchemaTypes as Types, Model, model, Document } from 'mongoose';
import { IUser } from '../interfaces';

// User DTO class
export class UserData {

    username: string;
    follows: number;
    followers: number;
    name?: string;
    age?: number;
    bio?: string;

    constructor(user: IUser) {
        this.username = user.username;
        this.follows = user.follows.length;
        this.followers = user.followers.length;
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
}

// Create interface for User model
export interface IUserModel extends Model<IUserDocument> {
  // TODO - define user model methods
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
        default: 'notAdmin'
    },
    name: Types.String,
    age: Types.Number,
    bio: Types.String,
    follows: {
        type: [Types.ObjectId],
        ref: 'User'
    },
    followers: {
        type: [Types.ObjectId],
        ref: 'User'
    }
});

export const User = model<IUserDocument, IUserModel>('User', userSchema);