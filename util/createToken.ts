import * as jwt from 'jsonwebtoken';
import { IUserDocument } from '../models';

const JWT_SECRET = process.env.JWT_SECRET || 'NotThisSecret';

export const CreateToken = (user: IUserDocument | null): string => {
  // Create object with necessary JWT data
  if (!user) {
    return 'false';
  }
  const payload = {
    _id: user._id,
    username: user.username,
    admin: user.admin
  };

  // Create JWT string and attach to request header
  return jwt.sign(payload, JWT_SECRET);
};
