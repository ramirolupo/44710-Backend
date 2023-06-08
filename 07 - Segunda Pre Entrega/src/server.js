import './db/db.js';
import express from 'express';
import productsRouter from './routes/products.router.js';
//import cartsRouter from './routes/carts.router.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(errorHandler);

app.use('/products', productsRouter);
//app.use('/carts', cartsRouter);

const PORT = 8080;

app.listen(PORT, () => console.log(`SERVER UP ON PORT ${PORT}`));