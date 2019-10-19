import { Schema, SchemaTypes as Types, Model, model, Document } from "mongoose";
import { IProduct } from "../interfaces";
import { IProductDetails } from "../interfaces";

export interface IProductDocument extends IProduct, Document {
  // TODO - define Product document methods
}

export interface IProductModel extends Model<IProductDocument> {
  // TODO - define Product model methods
}

const ingredientsSchema = new Schema({
  name: Types.String,
  measurement: Types.String
});

const productDetailsSchema = new Schema({
  subType: Types.String,
  ingredients: [ingredientsSchema],
  directions: Types.String,
  glassType: Types.String,
  ABV: Types.Number,
  desc: Types.String,
  organic: Types.Boolean
});

const productSchema = new Schema({
  extID: {
    type: Types.String,
    required: true,
    unique: true
  },
  type: {
    type: Types.String,
    enum: ["BEER", "WINE", "MIXED"],
    required: true
  },
  name: {
    type: Types.String,
    required: true
  },
  desc: Types.String,
  imgUrl: Types.String,
  comments: [{ Type: Types.ObjectId, ref: "Comment" }],
  details: productDetailsSchema
});

export const Product = model<IProductDocument, IProductModel>(
  "Product",
  productSchema
);
