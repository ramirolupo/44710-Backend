import express from 'express';
import { __dirname } from './path.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.Router.js';
import { Server } from 'socket.io';
import { ProductManager } from "./manager/productManager.js";
const productManager = new ProductManager(__dirname + '/data/productos.json');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);


const httpServer = app.listen(8080, ()=>{
    console.log('🚀 Server listening on port 8080');
});

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) =>{
    console.log('usuario conectado!', socket.id);
    socket.on('disconnect', ()=>{
        console.log('usuario desconectado!');
    });

    socket.on('getProducts', async () => {
        const products = await productManager.getProducts();
        socket.emit('products', products);
      });

    socket.on('newProduct', async(obj)=>{
        await productManager.addProduct(obj);
        socketServer.emit('products', await productManager.getProducts());
    });

    socket.on('deleteProduct', async (productId) => {
        await productManager.deleteProduct(productId);
        const products = await productManager.getProducts();
        socketServer.emit('products', products);
        socket.emit('productDeleted', productId);
        console.log('Prueba');
    });
});