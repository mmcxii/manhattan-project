import passportLocal from "passport-local";
import bcrypt from "bcrypt";
import { User, IUserDocument } from "../models";
import * as jwt from 'jsonwebtoken';


//Login strategy
const Strategy = passportLocal.Strategy;

//JWT Sign and verify strategies

export const passportStrategy = (passport: any) => {
  passport.use(
    "login",
    new Strategy(async (username: string, password: string, done) => {
      //Find user
      try {
        const user: IUserDocument | null = await User.findOne({
          username: username.toLowerCase()
        });

        if (!user) {
          return done(null, false, { message: "Username not found" });
        }

        bcrypt.compare(password, user.password, (err, match) => {
          if (err) throw err;

          if (match) {
            const payload = {
              _id: user._id,
              username: user.username,
              followers: user.followers,
              follows: user.follows
            }
            const token: string = jwt.sign(payload, 'privateKey')
            console.log(token);
            return done(null, token);
          } else {
            return done(null, false, { message: "Incorrect password" });
          }
        });
      } catch (err) {
        return new Error(err);
      }
    })
  );
};
