import { Router } from 'express';
import * as controller from '../controllers/carts.controller.js';
import { isAuth } from '../middlewares/isAuth.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { isUser } from '../middlewares/isUser.js';


const router = Router();

router.get('/', isAuth, isAdmin, controller.getAllCarts);

router.get('/:idCart', isAuth, controller.getCartById);

router.post('/', /*isAuth,*/ controller.createCart);

router.put('/:idCart', isAuth, isUser, controller.updateCart); 

router.put('/:idCart/products/:idProd', isAuth, isUser, controller.updateProductCart);

router.delete('/products/:idCart', isAuth, controller.deleteCartProducts);

router.delete('/:idCart/products/:idProd', isAuth, controller.deleteProductFromCart);

router.delete('/:idCart', isAuth, controller.deleteCart);

export default router;
