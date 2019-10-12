import { Document } from 'mongoose';

export interface IProduct extends Document {
    extID: string;
    type: string,
    name?: string;
    desc?: string;
    ABV?: number
}