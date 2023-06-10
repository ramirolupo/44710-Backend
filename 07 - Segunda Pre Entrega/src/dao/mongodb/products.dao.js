import { ProductModel } from "./models/products.model.js";
import { CartModel } from "./models/carts.model.js";

export default class ProductDaoMongoDB {

  async getAllProducts(page = 1, limit = 10, sort, query) {
    try{
      let result;
      const filter = { brand: query };
      if (query) {
        result = await ProductModel.aggregate([
          { $match: filter },
          { $sort: { price: parseInt(sort) }},
          { $skip: (parseInt(page) - 1) * parseInt(limit) },
          { $limit: parseInt(limit) }
        ]);
      } else {
        result = await ProductModel.paginate({}, { page, limit, sort: { price: sort }});
      }
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    try {
      const response = await ProductModel.findById(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async createProduct(obj) {
    try {
      const response = await ProductModel.create(obj);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id, obj) {
    try {
      await ProductModel.updateOne({_id: id}, obj);
      return obj;
    } catch (error) {
      console.log(error);
    }
  }

  async addProductToCart(idProd, idCart) {
    try {
      const cart = await CartModel.findById(idCart);
      if (!cart) { throw new Error('Cart not found')}
      const prodIndex = cart.products.findIndex(p => p.product._id.toString() === idProd.toString());
      const product = await ProductModel.findById(idProd);
      if (!product) { throw new Error('Product not found')}
      if (prodIndex !== -1) {
        cart.products[prodIndex].quantity += 1;
      } else {
        cart.products.push({ product: product, quantity: 1 })
      }                         
      await cart.save();                            
      return cart;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const response = await ProductModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


}