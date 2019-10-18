export enum ProductType {
  'BEER', 'WINE', 'MIXED'
}
export interface IProduct {
    extID: string;
    type: ProductType,
    name?: string;
    desc?: string;
    ABV?: number
}