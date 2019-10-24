import * as jwt from "jsonwebtoken";
import express from "express";
import { IUserRequest, IUserToken } from "../interfaces";

export const validateToken = (
  req: IUserRequest,
  res: express.Response,
  next: any
) => {
  
  if (req.method === "GET") {
    return next();
  }
  //Get header from request

  const authHeader = req.headers.authorization;
  //Check that header is present
  if (authHeader) {
    const token: string = authHeader.split(" ")[1]; //Bearer <token>

    try {
      //Verify and decode JWT

      const decoded: IUserToken = jwt.verify(token, "privateKey") as IUserToken;
      //Attach user data to req

      req.token = decoded;

      next();
    } catch (err) {
      //Error validating token
      res.status(401).send(err);
    }
  } else {
    //No token present.
    res.status(401).send(`Unable to authenticate request. No token.`);
  }
};
