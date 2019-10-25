import { CommentProps } from './IComment';
import { UserProps } from './UserContext';

enum ProductType {
  'BEER',
  'WINE',
  'MIXED',
}

interface ProductDetail {
  subtype?: string;
  ingredients?: { name: string; measurement: string }[];
  direction?: string;
  glassType?: string;
  ABV?: string;
  desc?: string;
  organic?: string;
}

export interface ProductProps {
  extID: string;
  type: ProductType;
  detail: ProductDetail;
  imgUrls: string[];
  comments: CommentProps[];
  upvotes: UserProps[];
  downvotes: UserProps[];
  rating: number;
}
