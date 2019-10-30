import { CommentProps } from './IComment';
import { UserProps } from './UserContext';

type ProductType = 'BEER' | 'WINE' | 'MIXED';

interface ProductDetail {
  subtype?: string;
  ingredients?: { name: string; measurement: string }[];
  direction?: string;
  glassType?: string;
  ABV?: string;
  desc?: string;
  organic?: boolean;
}

export interface ProductProps {
  extID: string;
  type: ProductType;
  details: ProductDetail;
  imgUrl: string;
  name: string;
  comments: CommentProps[];
  upvotes: UserProps[];
  downvotes: UserProps[];
  rating: number;
}
