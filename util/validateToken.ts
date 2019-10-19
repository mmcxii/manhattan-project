import * as jwt from 'jsonwebtoken';
import express from 'express';

declare module 'express' {
    interface Request {
        'token'?: any;
        'body'?: any;
    }
  }
  

export const validateToken = (req: express.Request, res: express.Response, next: any) => {
    //Get header from request
    const authHeader = req.headers.authorization;
    //Check that header is present
    if (authHeader) {
        const token: string = authHeader.split(' ')[1]; //Bearer <token>    

        try {
            //Verify and decode JWT
            
            const decoded: string | object = jwt.verify(token, 'privateKey')
            //Attach user data to req
            
            req.token = decoded;

            next();
        } catch (err) {
            //Error validating token
            res.status(401).send(err);
        }
    } else {
        //No token present.
        res.status(401).send(`Unable to authenticate request. No token.`)
    }
}