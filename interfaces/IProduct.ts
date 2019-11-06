import { IProductDetails } from './IProductDetails';
import { IComment } from './IComment';
import { IUserDocument } from '../models';

export enum ProductType {
  BEER = 'BEER',
  WINE = 'WINE',
  MIXED = 'MIXED'
}
export interface IProduct {
  extID: string;
  type: ProductType;
  name: string[];
  details: IProductDetails;
  imgUrl: string[];
  comments: IComment[];
  upvotes: IUserDocument[];
  downvotes: IUserDocument[];
  rating: number;
}
