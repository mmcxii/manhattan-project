import { Router } from 'express';
import { User, IUserDocument } from "../models/User";
import { IUser } from "../interfaces/IUser";
import bcrypt from "bcrypt";
import passport from 'passport';


export const LoginRoutes = Router()
.post('/createuser', async(req, res) => {
    
    if (!req.body) {
        return res.status(400).send('Missing user data.');
      }
    
    const {username, password} = req.body;

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
                  password: hash
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
.post('/auth', passport.authenticate('login', {session: false, failureRedirect: '/'}), (req, res) => {
  //Token fine, decide what other info we want attached/returned on login.
  res.status(200).json(req.user);
})