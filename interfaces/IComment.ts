import { IUser } from '../interfaces';
import { IUserDocument } from '../models';
import { IProduct } from './IProduct';

export interface IComment {
    author: IUserDocument;
    text: string;
    upvotes: IUser[];
    downvotes: IUser[];
    rating: number
    product: IProduct;
}
