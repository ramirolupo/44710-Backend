import { Router } from 'express';
import * as controller from '../controllers/carts.controller.js';

const router = Router();

router.get('/', controller.getAllCarts);

router.get('/:idCart', controller.getCartById);

router.post('/', controller.createCart);

router.put('/:idCart', controller.updateCart); 

router.put('/:idCart/products/:idProd', controller.updateProductCart);

router.delete('/products/:idCart', controller.deleteCartProducts);

router.delete('/:idCart/products/:idProd', controller.deleteProductFromCart);

router.delete('/:idCart', controller.deleteCart);

export default router;
