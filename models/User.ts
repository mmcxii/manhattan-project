import { Schema, SchemaTypes as Types, Model, model } from 'mongoose';
import { IUser } from '../interfaces/IUser';

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

export const User: Model<IUser> = model<IUser>('User', userSchema);