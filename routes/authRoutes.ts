import express, { Router } from 'express';
import { User, UserData } from '../models';
import { IUser, IUserRequest, IUserToken } from '../interfaces';
import bcrypt from 'bcrypt';
import { loginUser } from '../util/loginUser';
import { validateToken } from '../util/validateToken';
import { Status, NotFound, ServerError, BadRequest, Ok, Unprocessable, Unauthorized } from './Status';

const PW_LENGTH = 4;

async function registerUser(
  username: string,
  password: string,
  admin: string
): Promise<IUser | Error> {
  try {
    // Encrypt user password
    const encrypted = await bcrypt.hash(password, 10);

    // Create new User document
    const newUser = new User({ username, password: encrypted, admin });

    // Save and return new User
    return newUser.save();
  } catch (error) {
    return error;
  }
}

export const AuthRoutes = Router()
  .post('/register', async (req, res) => {
    let { username, password, admin } = req.body;

    username = username && username.trim().toLowerCase();
    password = password && password.trim();

    if (!username) {
      return BadRequest(res, 'Username is missing or empty.');
    }
    if (!password) {
      return BadRequest(res, 'Password is missing or empty.');
    }

    // Require password length
    if (password.length < PW_LENGTH) {
      return BadRequest(res, `Password must be at least ${PW_LENGTH} characters long.`);
    }

    try {
      //check if username exists
      const user: IUser | null = await User.findOne({ username });

      //If user exists, reject it
      if (user) {
        return Unprocessable(res, 'Username already exists!');
      }

      const newUser: IUser | Error = await registerUser(username, password, admin);

      if (newUser instanceof Error) {
        throw newUser;
      }

      return Ok(res, new UserData(newUser), Status.Created);
    } catch (err) {
      return ServerError(res, `Error creating user ${err}`);
    }
  })
  .post('/login', loginUser, async (req: IUserRequest, res: express.Response) => {
    // Verify username is supplied
    const { username } = req.body;

    if (!username) {
      return BadRequest(res, 'Username data missing.');
    }

    // Verify token has been attached to response header
    if (!req.tokenString) {
      return BadRequest(res, 'Login failed. Missing authorization header.');
    }

    // Lookup associated User doc and return with token
    const user: IUser | null = await User.findOne({ username });

    if (!user) {
      return NotFound(res, `User ${username} not found.`);
    }

    const userData = {
      token: req.tokenString,
      user: new UserData(user)
    };

    return Ok(res, userData);
  })
  .post('/:username', validateToken, async (req: IUserRequest, res: express.Response) => {
    // Verify identity of provided user. Verifies user matches username in supplied token.
    // Returns associated User document, else 401 status.
    const username: string = req.params.username.toLowerCase();
    const userToken: IUserToken | undefined = req.token;

    const unauthorized = !userToken || userToken.username !== username;
    if (unauthorized) {
      return Unauthorized(res, `Failed to verify identity of user ${username}`);
    }

    const user: IUser | null = await User.findOne({ username });
    if (!user) {
      return NotFound(res, `User ${username} not found.`);
    }

    return Ok(res, user);
  });
