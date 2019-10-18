import { IUser } from '../interfaces/IUser';

export interface IComment {
    author: IUser;
    text: string;
    upvotes: IUser[];
    downvotes: IUser[];
    rating: number
}
