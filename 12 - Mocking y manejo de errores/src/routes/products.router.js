import { Router } from 'express';
import * as controller from '../controllers/products.controller.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { isAuth } from '../middlewares/isAuth.js';
import { isUser } from '../middlewares/isUser.js';

const router = Router();

router.post('/file', /*isAuth, isAdmin,*/ controller.createFileCtr);

router.post('/mockingproducts', /*isAuth, isAdmin,*/ controller.createProductsMock);

router.get('/', /*isAuth,*/ controller.getAllProducts);

router.get('/:idProd', /*isAuth,*/ controller.getByIdProduct);

router.post('/add', /*isAuth, isAdmin,*/ controller.createProduct);

router.post('/add/:idProd/:idCart', /*isAuth, isUser,*/ controller.addProductToCart);

router.delete('/:idProd', /*isAuth, isAdmin,*/ controller.deleteProduct);

router.delete('/', /*isAuth, isAdmin,*/ controller.deleteAllProducts);


export default router;