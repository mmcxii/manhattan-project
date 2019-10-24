import { IProductIngredients } from "./IProductIngredients";

export interface IProductDetails {
  subType?: string;
  ingredients?: IProductIngredients[];
  directions?: string;
  glassType?: string;
  ABV?: number;
  desc?: string;
  organic?: boolean;
}
