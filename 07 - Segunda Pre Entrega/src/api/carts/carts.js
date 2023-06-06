import { Router } from "express";
const router = Router();
import { CartManager } from '../../manager/cartManager.js';
const cartManager = new CartManager('./src/data/carrito.json');

router.get('/:cid', async(req, res) => {
    try {
        const { cid } = req.params;
        const carts = await cartManager.getCarts(Number(cid));
        res.status(200).json(carts);
    } catch (error) {
        res.status(401).json({ message: error.message });
        console.log(error);
    }
});


router.post('/', async (req, res)=>{
    try {
        const idProduct = req.body.id;
        const newCart = await cartManager.addCart(idProduct);
        res.json(newCart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/:cid/product/:pid', async (req, res)=>{
    try {
        const { cid } = req.params;
        const { pid } = req.params;
        const newCart = await cartManager.addProductToCart(Number(cid), Number(pid));
        res.json(newCart);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});



export default router;