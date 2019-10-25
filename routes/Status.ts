import { Response, response } from 'express';

export enum Status {
  OK = 200,
  Created = 201,
  Accepted = 202,
  NoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  ServerError = 500
}

export const SendStatus = (res: Response, statusCode: Status): Response => {
  return res.status(statusCode).send(Status[statusCode]);
}

export const Ok = <T extends unknown>(res: Response, data: T, okStatus = Status.OK): Response => {
  const setMsg = typeof data === 'string';
  const resData = setMsg ? { message: data } : data;
  return res.status(okStatus).json(resData);
}

export const OkNoContent = (res: Response): Response => {
  return res.sendStatus(Status.NoContent);
}

export const BadRequest = (res: Response, message: string): Response => {
  return fillError(Status.BadRequest, res, message);
}
export const Unauthorized = (res: Response, message: string): Response => {
  return fillError(Status.Unauthorized, res, message);
}
export const Forbidden = (res: Response, message: string): Response => {
  return fillError(Status.Forbidden, res, message);
}
export const NotFound = (res: Response, message: string): Response => {
  return fillError(Status.NotFound, res, message);
}
export const ServerError = (res: Response, error: string | Error): Response => {
  const message = error instanceof Error ? error.message : error;
  return fillError(Status.ServerError, res, message);
}

const fillError = (status: Status, res: Response, message: string): Response => {
  return res.status(status).json({ message, status: Status.NotFound });
}