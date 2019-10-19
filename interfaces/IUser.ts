import { IProduct } from "./IProduct";

export interface IUser {
  username: string;
  password: string;
  admin: string;
  follows: IUser[];
  followers: IUser[];
  name?: string;
  age?: number;
  bio?: string;
  theme?: string;
  highlightedFavorite: IProduct;
  favorites: IProduct[];
}
