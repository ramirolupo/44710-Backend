import { Router } from 'express';
import * as controller from '../controllers/products.controller.js';

const router = Router();

router.post('/file', controller.createFileCtr);

router.get('/', controller.getAllProducts);

router.get('/:idProd', controller.getByIdProduct);

router.post('/add', controller.createProduct);

router.put('/:idProd');

router.post('/add/:idProd/:idCart', controller.addProductToCart);

router.delete('/:idProd', controller.deleteProduct);


export default router;