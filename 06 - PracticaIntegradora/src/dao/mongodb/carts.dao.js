import { CartsModel } from "./models/carts.models";


export default class CartsDaoMongoDB {

  async getAllCarts() {
    try {
     const response = await CartsModel.find({});
     return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getCartById(id) {
    try {
      const response = await CartsModel.findById(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async createCart(obj) {
    try {
      const response = await CartsModel.create(obj);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateCart(id, obj) {
    try {
      await CartsModel.updateOne({_id: id}, obj);
      return obj;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCart(id) {
    try {
      const response = await CartsModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}