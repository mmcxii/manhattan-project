import express, { Router } from 'express';
import { User, IUserDocument } from "../models";
import { IUser, IUserRequest } from "../interfaces";
import bcrypt from "bcrypt";
import { loginUser } from '../util/loginUser';

declare module 'express' {
  interface Request {
      'token'?: any;
      'body'?: any;
  }
}


export const LoginRoutes = Router()
.post('/register', async(req, res) => {
  const {username, password, admin} = req.body;
    
  if (!username || !password) {
        return res.status(400).send('Missing user data.');
      }

    

    try {
        //check if username exists
        const user: IUser | null = await User.findOne({
          username: username.toLowerCase()
        });

        //If user exists, reject it
        if(user) {
          return res.status(422).send('Username already exists!');
        }
      ​
        const newUser = await new Promise<IUserDocument>((resolve) => {
      ​
          //hash password
          bcrypt.hash(password, 10, (err, hash) => {
              if (err) {
                  return res.status(500).send(`Error hashing password ${err}`);
              }
      ​
              //TODO -- add default values for the rest of the account creation questions.
              const userData: object = {
                  username: username.toLowerCase(),
                  password: hash,
                  admin
              }
      ​
              const user: IUserDocument = new User(userData);
      ​
              resolve(user);
            });
        });
      ​
        const savedUser: IUserDocument = await newUser.save();
      ​
        return res.status(201).json(savedUser);

      } catch (err) {
        return res.status(500).send(`Error creating user ${err}`);
      }

})
.post('/login', loginUser, (req: IUserRequest, res: express.Response) => {
  //Token fine, decide what other info we want attached/returned on login.
   res.status(200).send(req.token);
})