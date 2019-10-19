import { Request } from 'express';

export interface IUserAuthInfo extends Request {
    user: {
        _id: string,
        username: string,
        admin: string
    };
}