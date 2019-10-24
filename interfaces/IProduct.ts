import { IProductDetails } from "./IProductDetails";
import { IComment } from "./IComment";
import { IUser } from "./IUser";

export enum ProductType {
  "BEER",
  "WINE",
  "MIXED"
}
export interface IProduct {
  extID: string;
  type: ProductType;
  detail: IProductDetails;
  imageUrls: string[];
  comments: IComment[];
  upvotes: IUser[];
  downvotes: IUser[];
  rating: number;
}
