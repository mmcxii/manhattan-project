import { QueryUpdateOptions } from 'mongoose';

export interface IUpdateContext {
  filter: Object;
  options: QueryUpdateOptions;
}