import { UserProps } from './UserContext';
import { ProductProps } from './IProduct';
//think this should be changed probably. Don't think we want an array of UserProps/the author to be UserProps. Probably fine if it's just the usernmae for author, and id for Up/Down
export interface CommentProps {
  _id: string;
  dateCreated: Date;
  author: UserProps;
  product: ProductProps;
  text: string;
  rating: number;
  upvotes: UserProps[];
  downvotes: UserProps[];
}
