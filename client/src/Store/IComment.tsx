import { UserProps } from './UserContext';

export interface CommentProps {
  _id: string;
  author: UserProps;
  text: string;
  upvotes: UserProps[];
  downvotes: UserProps[];
}
