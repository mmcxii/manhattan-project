import express, { Router } from 'express';
import { User, IUserDocument } from '../models';
import { IUser, IUserRequest, IUserToken } from '../interfaces';
import bcrypt from 'bcrypt';
import { loginUser } from '../util/loginUser';
import { validateToken } from '../util/validateToken';

export const AuthRoutes = Router()
  .post('/register', async (req, res) => {
    const { username, password, admin } = req.body;

    if (!username || !password) {
      return res.status(400).send('Missing user data.');
    }

    try {
      //check if username exists
      const user: IUser | null = await User.findOne({
        username: username.toLowerCase(),
      });

      //If user exists, reject it
      if (user) {
        return res.status(422).send('Username already exists!');
      }
      const newUser = await new Promise<IUserDocument>(resolve => {
        //hash password
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send(`Error hashing password ${err}`);
          }
          //TODO -- add default values for the rest of the account creation questions.
          const userData: object = {
            username: username.toLowerCase(),
            password: hash,
            admin,
          };
          const user: IUserDocument = new User(userData);
          resolve(user);
        });
      });
      const savedUser: IUserDocument = await newUser.save();
      return res.status(201).json(savedUser);
    } catch (err) {
      return res.status(500).send(`Error creating user ${err}`);
    }
  })
  .post('/login', loginUser, async (req: IUserRequest, res: express.Response) => {
    // Verify username is supplied
    const { username } = req.body;

    if (!username) {
      return res.status(400).send('Username data missing.');
    }

    // Verify token has been attached to response header
    if (!req.tokenString) {
      return res.status(400).send('Login failed. Missing authorization header.');
    }

    // Lookup associated User doc and return with token
    const user: IUser | null = await User.findOne({ username });

    if (!user) {
      return res.status(404).send(`User ${username} not found.`);
    }

    const userData = {
      token: req.tokenString,
      user,
    };

    res.status(200).send(userData);
  })
  .post('/:username', validateToken, async (req: IUserRequest, res: express.Response) => {
    // Verify identity of provided user. Verifies user matches username in supplied token.
    // Returns associated User document, else 401 status.
    const username: string = req.params.username.toLowerCase();
    const userToken: IUserToken | undefined = req.token;

    const unauthorized = !userToken || userToken.username !== username;
    if (unauthorized) {
      return res.sendStatus(401);
    }

    const user: IUser | null = await User.findOne({ username });
    if (!user) {
      return res.status(404).send(`User ${username} not found.`);
    }

    return res.json(user);
  });