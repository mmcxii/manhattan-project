import * as jwt from 'jsonwebtoken';

export default (req, res, next) => {
    //Get header from request
    const authHeader: string = req.headers.authorization;

    if (authHeader) {
        const token: string = authHeader.split(' ')[1]; //Bearer <token>
        console.log(token);
        
        

        try {
            //Verify and decode JWT
            const decoded: object | string = jwt.verify(token, 'privateKey', { maxAge: '7d' });
            console.log(decoded);
            //Attach user data to req
            req.user = decoded;
            //Call next middleware
            next();
        } catch (err) {
            console.log(err);
            res.status(401).send(err);
        }
    } else {
        res.status(401).send(`Unable to authenticate request. No token.`)
    }
}