import bcrypt from 'bcrypt';
import { Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { IUserRequest } from '../interfaces';
import { User, IUserDocument } from '../models';

export const loginUser = async (req: IUserRequest, res: Response, next: () => void) => {
  if (!req.body) {
    return res.status(400).send('No user info included in request.');
  }

  const { username, password } = req.body;

  try {
    // Read User document - return error if not found
    const user: IUserDocument | null = await User.findOne({
      username: username.toLowerCase()
    });

    if (!user) {
      return res.status(401).send('Username does not exist.');
    }

    // Verify user password is correct
    const match: boolean = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).send('Password incorrect.');
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
    return res.status(500).send(`Error processing your request: ${err}`);
  }
};
