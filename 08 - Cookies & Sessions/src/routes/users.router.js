import { Router } from 'express';
import * as controller from '../controllers/users.controller.js';

const router = Router();

router.post('/register', controller.createUser);

router.post('/login', controller.loginUser);

router.post('/logout', controller.logout);


export default router