import * as userServices from "../services/users.services.js";
import * as cartServices from "../services/carts.services.js";
import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';

const strategyOptions = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
};

const register = async (req, email, password, done) => {
    try {
        const user = await userServices.getUserByEmail(email);
        if(user) return done(null, false);
        const newUser = await userServices.createUser(req.body);
        const newCart = await cartServices.createCart();
        newUser.cart = newCart._id;
        await newUser.save();
        console.log(newUser.cart);
        return done(null, newUser);
    } catch (error) {
        console.log(error);      
    }
};

const login = async (req, email, password, done) => {
    try {
        const user = { email, password };
        const userLogin = await userServices.loginUser(user);
        if(!userLogin) return done(null, false);
        return done(null, userLogin);
    } catch (error) {
        console.log(error);
    };
};

const registerStrategy = new LocalStrategy(strategyOptions, register);
const loginStrategy = new LocalStrategy(strategyOptions, login);

passport.use('register', registerStrategy);
passport.use('login', loginStrategy);

passport.serializeUser(( user, done ) =>{
    done(null, user._id);
});

passport.deserializeUser(async( id, done) => {
    const user = await userServices.getUserById(id);
    return done(null, user);

});


