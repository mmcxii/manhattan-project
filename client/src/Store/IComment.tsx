import { UserProps } from './UserContext';

export interface CommentProps {
  author: UserProps;
  text: string;
  upvotes: UserProps[];
  downvotes: UserProps[];
  rating: number;
}
