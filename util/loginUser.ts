import bcrypt from 'bcrypt';
import { Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { IUserRequest } from '../interfaces';
import { User, IUserDocument } from '../models';
import { NotFound, ServerError, BadRequest, Unauthorized } from '../routes';

export const loginUser = async (req: IUserRequest, res: Response, next: () => void) => {
  if (!req.body) {
    return BadRequest(res, 'No user info included in request.');
  }

  let { username, password } = req.body;

  username = username && username.trim().toLowerCase();
  password = password && password.trim();

  // Verify username and password
  if (!username) {
    return BadRequest(res, 'Username is empty or missing.')
  }
  if (!password) {
    return BadRequest(res, 'Password is empty or missing.')
  }

  try {
    // Read User document - return error if not found
    const user: IUserDocument | null = await User.findOne({ username });

    if (!user) {
      return NotFound(res, 'Username does not exist.');
    }

    // Verify user password is correct
    const match: boolean = await bcrypt.compare(password, user.password);

    if (!match) {
      return Unauthorized(res, 'Password incorrect.');
    }

    // Create object with necessary JWT data
    const payload = {
      _id: user._id,
      username: user.username,
      admin: user.admin
    };

    // Create JWT string and attach to request header
    const token: string = jwt.sign(payload, 'privateKey');

    req.tokenString = token;
    next();
  } catch (err) {
    return ServerError(res, `Error processing your request: ${err}`);
  }
};
