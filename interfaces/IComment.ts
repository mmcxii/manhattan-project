import { IUser } from '../interfaces';

export interface IComment {
    author: IUser;
    text: string;
    upvotes: IUser[];
    downvotes: IUser[];
    rating: number
}
