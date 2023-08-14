import { cartModel } from "./models/carts.model.js";
import { ticketModel } from './models/tickets.model.js'


export default class CartsDaoMongoDB {

  async getAllCarts() {
    try {
     const response = await cartModel.find({});
     if (!response) return null;
     return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getCartById(id) {
    try {
      const response = await cartModel.findById(id);
      if (!response) return null;
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async createCart(obj) {
    try {
      const response = await cartModel.create(obj);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateCart(id, obj) {
    try {
      await cartModel.updateOne({_id: id}, obj);
      return obj;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCart(idCart) {
    try {
      const response = await cartModel.findByIdAndDelete(idCart);
      return response;
    } catch (error) {
      throw error;
    }
  }
}