import { Router } from 'express';
import * as controller from '../controllers/carts.controller.js';

const router = Router();

router.get('/', controller.getAllCarts);

router.get('/:cid', controller.getCartById);

router.post('/', controller.createCart);

router.put('/:cid', controller.updateCart); 

router.put('/:cid/products/:pid', controller.updateProductCart);

router.delete('/products/:cid', controller.deleteCartProducts);

router.delete('/:idCart/products/:idProd', controller.deleteProductFromCart);

router.delete('/:cid', controller.deleteCart);

export default router;
