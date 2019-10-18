export interface IUser {
  username: string;
  follows: IUser[];
  followers: IUser[];
  name?: string;
  age?: number;
  bio?: string;
}
