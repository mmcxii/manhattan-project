export interface IUser {
  username: string;
  name?: string;
  age?: number;
  bio?: string;
  follows?: IUser[];
  followers?: IUser[];
}
