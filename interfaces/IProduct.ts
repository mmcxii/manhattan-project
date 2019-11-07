import { IProductDetails } from './IProductDetails';
import { IUserDocument, ICommentDocument } from '../models';

export enum ProductType {
  BEER = 'BEER',
  WINE = 'WINE',
  MIXED = 'MIXED'
}
export interface IProduct {
  extID: string;
  type: ProductType;
  name: string;
  imgUrl: string;
  details: IProductDetails;
  imageUrls: string[];
  comments: ICommentDocument[];
  upvotes: IUserDocument[];
  downvotes: IUserDocument[];
  rating: number;
}
