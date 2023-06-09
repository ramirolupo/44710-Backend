import { Router } from 'express';
import * as controller from '../controllers/products.controller.js';

const router = Router();

router.post('/file', controller.createFileCtr);

router.get('/', controller.getAllProducts);

router.get('/aggregation1', controller.aggregation1);


export default router;