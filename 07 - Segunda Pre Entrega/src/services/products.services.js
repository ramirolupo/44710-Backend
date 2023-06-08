import ProductsDaoMongoDB from "../dao/mongodb/products.dao.js";
const prodDao = new ProductsDaoMongoDB();
import fs from 'fs';
import {__dirname} from '../path.js'
const ProductsFile = JSON.parse(fs.readFileSync(__dirname+'/data/products.json', 'utf-8'))

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

export const getAllProducts = async () => {
    try {
     const docs = await prodDao.getAllProducts();
     return docs;
    } catch (error) {
      console.log(error);
    }
};

export const getProductById = async (id) => {
    try {
      const doc = await prodDao.getProductById(id);
      if(!doc) throw new Error('Product not found')
      else return doc;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const createProduct = async (obj) => {
    try {
      const newProd = await prodDao.createProduct(obj);
      if(!newProd) throw new Error('Validation Error!')
      else return newProd;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const updateProduct = async (id, obj) => {
    try {
      const doc = await prodDao.getProductById(id);
      if(!doc){
         throw new Error('Product not found')
      } else {
        const prodUpd = await prodDao.updateProduct(id, obj)
        return prodUpd;
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  export const deleteProduct = async (id) => {
    try {
       const prodDel = await prodDao.deleteProduct(id);
       return prodDel;
    } catch (error) {
      console.log(error);
    }
  };
