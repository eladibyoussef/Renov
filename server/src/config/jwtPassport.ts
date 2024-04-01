import passport from 'passport';
import { catchError } from '../Util/errorCatch';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/User';
import Admin from '../models/Admin';
import dotenv from 'dotenv';

dotenv.config();
const options: any = {};

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.SECRET;

passport.use('jwt', new JwtStrategy(options, async (payload: any, done: any) => {
    // console.log(payload);
    // console.log('jwt',options.jwtFromRequest);
    console.log('options',options);
    console.log('load inside jwt strategy', payload);
    
    try {
             let  user;
        if(payload.type == 'user'){
             user = await User.findById(payload.id);
        }else if (payload.type == 'admin'){
            user = await Admin.findById(payload.id)
        }

        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            
        }
    } catch (error) {
        let message = catchError(error)
        console.log('error caught', message);
    }
}));



export const authentication = passport.authenticate('jwt', { session: false });
