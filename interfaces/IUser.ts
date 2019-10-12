import { Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    name?: string;
    age?: number;
    bio?: string;
    follows?: IUser[];
    followers?: IUser[];
}
