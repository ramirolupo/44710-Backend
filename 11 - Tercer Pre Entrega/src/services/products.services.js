import ProductsDaoMongoDB from "../persistence/dao/mongodb/products.dao.js";
import CartsDaoMongoDB from "../persistence/dao/mongodb/carts.dao.js";
import fs from 'fs';
import {__dirname} from '../utils.js';
const prodDao = new ProductsDaoMongoDB();
const cartDao = new CartsDaoMongoDB();
const ProductsFile = JSON.parse(fs.readFileSync(__dirname+'/data/products.json', 'utf-8'));

export const createFileProduct = async () => {
    try {
      const newProduct = await prodDao.createProduct(ProductsFile);
      if (!newProduct) return null;
      return { message: '¡Products saved successfully!' };
    } catch (error) {
      console.log(error);
    }
  };

export const getAllProducts = async (page, limit, sort, query) => {
    try {
     const products = await prodDao.getAllProducts(page, limit, sort, query);
     return products;
    } catch (error) {
      console.log(error);
    }
};

export const getProductById = async (idProd) => {
    try {
      const prod = await prodDao.getProductById(idProd);
      if(!prod) return null;
      return prod;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const createProduct = async (obj) => {
    try {
      const newProd = await prodDao.createProduct(obj);
      if(!newProd) return null;
      else return newProd;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const updateProduct = async (idProd, obj) => {
    try {
      const doc = await prodDao.getProductById(idProd);
      if(!doc) return null;
        const prodUpd = await prodDao.updateProduct(idProd, obj);
        return prodUpd;
    } catch (error) {
      console.log(error);
    }
  };


  export const addProductToCart = async (idProd, idCart) => {
      try {
        const cart = await cartDao.getCartById(idCart);
        if (!cart) return null;
          const prodIndex = cart.products.findIndex(p => p.product._id.toString() === idProd.toString());
          const product = await prodDao.getProductById(idProd);
          if (!product) return null;
            if (prodIndex !== -1) {
              cart.products[prodIndex].quantity += 1;
            } else {
              cart.products.push({ product: idProd, quantity: 1 })
            }                         
        await cart.save();                            
        return cart;
      } catch (error) {
        console.log(error);
      }
  };
  
  export const deleteProduct = async (idProd) => {
    try {
       const prodDel = await prodDao.deleteProduct(idProd);
       return prodDel;
    } catch (error) {
      console.log(error);
    }
  };
