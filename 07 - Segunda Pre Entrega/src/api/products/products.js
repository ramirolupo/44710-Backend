import { Router } from "express";
const router = Router();
import { ProductManager } from '../../manager/productManager.js';
const productManager = new ProductManager('./src/data/productos.json');

router.get('/', async(req, res) => {
    try {
        const limit = req.query.limit;
        const products = await productManager.getProducts();
        if (limit) {
            products = products.slice(0, limit);
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log(error);
    }
});


router.get('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const product = await productManager.getProductById(Number(id));
        if(product){
            res.status(200).json({ message: 'Producto encontrado.', product })
        } else {
            res.status(400).send('Producto no encontrado.')
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});


router.post('/', async (req, res)=>{
    try {
        const product = req.body;
        const newProduct = await productManager.addProduct(product);
        res.json(newProduct);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.put('/:id', async(req, res) => {
    try {
        const product = req.body;
        const { id } = req.params;
        const productFile = await productManager.getProductById(Number(id));
        if(productFile){
            await productManager.updateProduct(product, Number(id));
            res.send(`Producto actualizado!`);
        } else {
            res.status(404).send('Producto no encontrado.')
        }
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
});

router.delete('/:id', async(req, res)=>{
    try {
        const { id } = req.params;
        const products = await productManager.getProducts();
        if(products.length > 0){
            await productManager.deleteProduct(Number(id));
            res.send(`Producto id: ${id} borrado exitosamente.`);
        } else {
            res.send(`Productp id: ${id} no encontrado.`);
        }
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
});

export default router;