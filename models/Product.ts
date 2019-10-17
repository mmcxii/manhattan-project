import { Schema, SchemaTypes as Types, Model, model, Document } from 'mongoose';
import { IProduct } from '../interfaces/IProduct';

export interface IProductDocument extends IProduct, Document {
    // TODO - define Product document methods
}

export interface IProductModel extends Model<IProductDocument> {
    // TODO - define Product model methods
}

const productSchema = new Schema({
    extID: {
        type: Types.String,
        required: true,
        unique: true
    },
    type: {
        type: Types.String,
        required: true
    },
    name: {
        type: Types.String,
        required: true
    },
    desc: Types.String,
    ABV: Types.Number
});

export const Product = model<IProductDocument, IProductModel>('Product', productSchema);