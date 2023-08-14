import { productModel } from "./models/products.model.js";
import { cartModel } from "./models/carts.model.js";

export default class ProductDaoMongoDB {

  async getAllProducts(page = 1, limit = 10, sort, query) {
    try {
      let result;
      let filter = {};
      if (query) {
        const [key, value] = query.split(":");
        const formattedValue = value.charAt(0).toUpperCase() + value.slice(1);
        filter = { [key]: formattedValue };
      }
      result = await productModel.paginate(filter, { page, limit, sort: { price: sort } });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(idProd) {
    try {
      const response = await productModel.findById(idProd);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async createProduct(obj) {
    try {
      const response = await productModel.create(obj);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(idProd, obj) {
    try {
      await productModel.updateOne({_id: idProd}, obj);
      return obj;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(idProd) {
    try {
      const response = await productModel.findByIdAndDelete(idProd);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


}