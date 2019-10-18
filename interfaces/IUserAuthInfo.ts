import { Request } from 'express';

export interface IUserAuthInfo extends Request {
    user: string | object;
}