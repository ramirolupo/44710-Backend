import express from 'express';
import { ProductManager } from './productManager.js';

const app = express();
const productManager = new ProductManager('./productos.json');


app.get('/products', async (req, res) => {
    const limit = req.query.limit;
    let products = await productManager.getProducts();
    
    if (limit) {
        products = products.slice(0, limit);
    }
    
    res.json(products);
});

app.get('/products/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid);
    const product = await productManager.getProductByID(pid);
    
    res.json(product);
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server funcionando en el puerto ${PORT}`);
});