import * as jwt from 'jsonwebtoken';

export const validateToken = (req: any, res: any, next: any) => {
    //Get header from request
    const authHeader: string = req.headers.authorization;
    //Check that header is present
    if (authHeader) {
        const token: string = authHeader.split(' ')[1]; //Bearer <token>    
        

        try {
            //Verify and decode JWT
            const decoded: object | string = jwt.verify(token, 'privateKey', { maxAge: '2ms' });
            //Attach user data to req
            req.user = decoded;
            //Call next middleware
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