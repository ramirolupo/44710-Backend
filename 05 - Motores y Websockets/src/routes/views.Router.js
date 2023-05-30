import { Router } from "express";
import { __dirname } from '../path.js';
import { ProductManager } from "../manager/productManager.js";
const productManager = new ProductManager(__dirname + '/data/productos.json');
const router = Router();


router.get('/home', async (req,res) => {
    const products = await productManager.getProducts();
    res.render('home', { products });
});

router.get('/realtimeproducts', async (req, res) => {
    res.render('realtimeproducts');
  });

export default router;