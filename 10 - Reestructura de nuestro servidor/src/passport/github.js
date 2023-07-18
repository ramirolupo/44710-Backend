import { Strategy as GithubStrategy } from "passport-github2";
import passport from "passport";
import UserDao from "../dao/mongodb/users.dao.js";
const userDao = new UserDao();

const strategyOptions = {
    clientID: 'Iv1.3a2063203d4cc30c',
    clientSecret: '9f7877cc03d1642b94cef4592245a266e9cf84dc',
    callbackURL: 'http://localhost:8080/users/profile-github'
};

const registerOrLogin = async(accessToken, refreshToken, profile, done) =>{
    console.log('profile:::', profile);
    const email = profile._json.email;
    const user = await userDao.getByEmail(email);
    if(user) return done(null, user);
    const newUser = await userDao.createUser({
        first_name: profile._json.name.split(' ')[0],
        last_name: profile._json.name.split(' ')[1],
        email,
        password: ' ',
        isGithub: true
    });
    return done(null, newUser);
}

passport.use('github', new GithubStrategy(strategyOptions, registerOrLogin));