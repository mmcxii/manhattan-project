import { IUser } from '../interfaces';
import { IUserDocument } from '../models';

export interface IComment {
    author: IUserDocument;
    text: string;
    upvotes: IUser[];
    downvotes: IUser[];
    rating: number
}
