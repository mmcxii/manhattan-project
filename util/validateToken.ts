import * as jwt from 'jsonwebtoken';
import { IUserAuthInfo } from '../interfaces';
import { Response, NextFunction } from 'express';

export const validateToken = (req: IUserAuthInfo, res: Response, next: NextFunction) => {
    //Get header from request
    const authHeader = req.headers.authorization;
    //Check that header is present
    if (authHeader) {
        const token: string = authHeader.split(' ')[1]; //Bearer <token>    

        try {
            //Verify and decode JWT
            const decoded: object | string = jwt.verify(token, 'privateKey');
            //Attach user data to req
            req.user = decoded;

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