import express from 'express';
import productsRouter from './api/products/products.js';
import cartRouter from './api/carts/carts.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/products', productsRouter);
app.use('/cart', cartRouter);

const PORT = 8080;

app.listen(PORT, ()=>{
    console.log(`Server ok en puerto: ${PORT}`);
});