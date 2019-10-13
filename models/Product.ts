import { Schema, SchemaTypes as Types, Model, model } from 'mongoose';
import { IProduct } from '../interfaces/IProduct';

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

export const Product: Model<IProduct> = model<IProduct>('Product', productSchema);