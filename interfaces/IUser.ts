export interface IUser {
  username: string;
  admin: string;
  follows: IUser[];
  followers: IUser[];
  theme?: 'dark' | 'light';
  highlightedFavorite?: string;
  name?: string;
  age?: number;
  bio?: string;
}
