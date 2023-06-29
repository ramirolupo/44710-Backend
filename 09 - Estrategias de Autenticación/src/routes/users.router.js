import { Router } from 'express';
import * as controller from '../controllers/users.controller.js';
import passport from 'passport';
import { registerResponse, loginResponse, githubResponse } from '../controllers/users.controller.js';

const router = Router();

router.post('/register', passport.authenticate('register'), registerResponse);

router.post('/login', passport.authenticate('login'), loginResponse);

router.post('/logout', controller.logout);

router.get('/register-github', passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/profile-github', passport.authenticate('github', { scope: [ 'user:email' ] }), githubResponse);


export default router