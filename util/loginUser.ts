import bcrypt from "bcrypt";
import { User, IUserDocument } from "../models";
import express from 'express';
import * as jwt from 'jsonwebtoken';
import {IUserRequest, IUserToken} from '../interfaces'

export const loginUser = async (req: IUserRequest, res: express.Response, next: any) => {
    
    if (!req.body) {
        return res.status(400).send('No user info included in request.')
    }

    const {username, password} = req.body;
    
    try {
        const user: IUserDocument | null = await User.findOne({
          username: username.toLowerCase()
        });

        if (user) {
          bcrypt.compare(password, user.password, (err, match) => {
              if (err) throw err;

              if (match) {
                const payload = {
                    _id: user._id,
                    username: user.username,
                    admin: user.admin
                  }
                  const token: IUserToken = jwt.sign(payload, 'privateKey') as unknown as IUserToken;

                  req.token = token;
                  next();
              }
          })
        } else {
           return res.status(401).send('Username does not exist.');
        }


}        catch (err) {
    return res.status(500).send(`Error processing your request: ${err}`);
}}
