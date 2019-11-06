import { IUser } from '../interfaces';
import { IUserDocument } from '../models';
import { IProduct } from './IProduct';

export interface IComment {
  dateCreated: Date;
  author: IUserDocument;
  text: string;
  upvotes: IUser[];
  downvotes: IUser[];
  rating: number;
  product: IProduct;
}
