import './db/db.js';
import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import usersRouter from './routes/users.router.js';
import { errorHandler } from './middlewares/errorHandler.js';
import session from 'express-session';
import mongoStore from 'connect-mongo';

const app = express();

app.use(
  session({
    secret: 'sessionKey',
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
      mongoUrl: 'mongodb+srv://ramaalupo:admin@rlcluster.v1kncvp.mongodb.net/ecommerce?retryWrites=true&w=majority',
      ttl: 10,
    }),
  })
);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/products', productsRouter);
app.use('/carts', cartsRouter);
app.use('/users', usersRouter);

app.use(errorHandler);

const PORT = 8080;

app.listen(PORT, () => console.log(`SERVER UP ON PORT ${PORT}`));