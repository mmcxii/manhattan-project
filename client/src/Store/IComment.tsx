import { UserProps } from './UserContext';
//think this should be changed probably. Don't think we want an array of UserProps/the author to be UserProps. Probably fine if it's just the usernmae for author, and id for Up/Down
export interface CommentProps {
  _id: string;
  rating: number;
  author: UserProps;
  text: string;
  upvotes: UserProps[];
  downvotes: UserProps[];
}
