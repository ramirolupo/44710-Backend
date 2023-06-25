import ProductsDaoMongoDB from "../dao/mongodb/products.dao.js";
import fs from 'fs';
import {__dirname} from '../utils.js';
const prodDao = new ProductsDaoMongoDB();
const ProductsFile = JSON.parse(fs.readFileSync(__dirname+'/data/products.json', 'utf-8'));

export const createFileProduct = async () => {
    try {
      const newProduct = await prodDao.createProduct(ProductsFile);
      console.log('Products saved successfully!');
      if (!newProduct) throw new Error("Validation Error!");
      else return { message: '¡Products saved successfully!' };
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
      if(!prod) throw new Error('Product not found');
      else return prod;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const createProduct = async (obj) => {
    try {
      const newProd = await prodDao.createProduct(obj);
      if(!newProd) throw new Error('Validation Error!');
      else return newProd;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const updateProduct = async (idProd, obj) => {
    try {
      const doc = await prodDao.getProductById(idProd);
      if(!doc){
         throw new Error('Product not found');
      } else {
        const prodUpd = await prodDao.updateProduct(idProd, obj);
        return prodUpd;
      }
    } catch (error) {
      console.log(error);
    }
  };


  export const addProductToCart = async (idProd, idCart) => {
    try {
      const newCart = await prodDao.addProductToCart(idProd, idCart);
      if (!newCart) throw new Error("Validation Error!");
      else return newCart;
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
