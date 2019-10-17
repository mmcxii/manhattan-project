import passportLocal from "passport-local";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import { IUser } from "../interfaces/IUser";
import * as jwt from 'jsonwebtoken';


//Login strategy
const Strategy = passportLocal.Strategy;

//JWT Sign and verify strategies


export default (passport: any) => {
  passport.use(
    "login",
    new Strategy(async (username: string, password: string, done) => {
      //Find user
      try {
        const user: IUser | null = await User.findOne({
          username: username.toLowerCase()
        });

        if (!user) {
          return done(null, false, { message: "Username not found" });
        }

        bcrypt.compare(password, user.password, (err, match) => {
          if (err) throw err;

          if (match) {
            const token: string = jwt.sign(user, 'privateKey', { expiresIn: '7d' })
            console.log('Token created!', token);
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
