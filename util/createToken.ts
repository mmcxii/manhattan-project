import * as jwt from 'jsonwebtoken';
import { IUserDocument } from '../models';

export const CreateToken = (user: IUserDocument): string => {
  // Create object with necessary JWT data
  const payload = {
    _id: user._id,
    username: user.username,
    admin: user.admin
  };

  // Create JWT string and attach to request header
  return jwt.sign(payload, 'privateKey');
};
