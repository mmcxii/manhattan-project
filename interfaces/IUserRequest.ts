import express from 'express';
import { IUserToken } from './IUserToken';

export interface IUserRequest extends express.Request {
    token?: IUserToken;
}