import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import { User } from '../models/User';

const Strategy = passportLocal.Strategy;

module.exports = function(passport) {

    passport.use(
        new Strategy((username : string, password: string, cb) => {

            //Find user
            User.find({ username: username.toLocaleLowerCase() })
            .then( user => {
                
                //If no return, user doesn't exist
                if (!user) {
                    return cb(null, false, {message: 'Username not found'});
                }

                //Match incoming pw with hashed pw

                bcrypt.compare(password, user.password, (err, match) => {
                    if (err) throw err;

                    if (match) {
                        return cb(null, user);
                    } else {
                        return cb(null, false, {message: 'Incorrect password'});
                    }
                });

            })
            .catch( err => {
                console.log(err);
            })
        })
    )

    passport.serializeUser((user, cb) => {
        cb(null, user._id);
    })

    passport.deserializeUser((id : string, cb) => {
        User.findById(id)
        .then(user => {
            cb(null, user)
        })
        .catch(cb);
    })
}