export interface IUser  {
    username: string;
    password: string;
    name?: string;
    age?: number;
    bio?: string;
    follows?: IUser[];
    followers?: IUser[];
}
