import { CartModel } from "./models/carts.model.js";
import { ProductModel } from "./models/products.model.js";


export default class CartsDaoMongoDB {

  async purchase(idCart) {
    try {
        const cart = await CartModel.findById(idCart);
        if (!cart) {
            return res.status(404).json({ message: 'Cart does not exist' });
        }
        for (const item of cart.products) {
            const product = item.product;
            const quantityInCart = item.quantity;
            if (!product || product.stock < quantityInCart) {
                return res.status(400).json({ message: 'Out of stock' });
            }
            product.stock -= quantityInCart;
            await product.save();
        }
       
    } catch (error) {
      console.error('There was an error during the purchase: ', err);
      return null;
    }
    
}

  async getAllCarts() {
    try {
     const response = await CartModel.find({});
     if (!response) { throw new Error('Any Cart created') }
     return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getCartById(id) {
    try {
      const response = await CartModel.findById(id);
      if (!response) { throw new Error('Cart not found') }
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async createCart(obj) {
    try {
      const response = await CartModel.create(obj);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateCart(id, obj) {
    try {
      await CartModel.updateOne({_id: id}, obj);
      return obj;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProductCart (idCart, idProd, quantity) {
    try {
      const cart = await CartModel.findById(idCart);
      if(!cart) { throw new Error('Cart not found') }
      const prodIndex = cart.products.findIndex(p => p.product._id.toString() === idProd.toString());
      if (prodIndex !== -1) {
        cart.products[prodIndex].quantity += quantity;
      } else {
        cart.products.push({ product: idProd, quantity: quantity }) 
      }                         
      await cart.save();                            
      return cart;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteCartProducts(idCart) {
    try {
      const response = await CartModel.findById(idCart);
      if (!response) { throw new Error('Cart not found') }
      response.products = [];
      await response.save();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProductFromCart(idCart, idProd) {
    try {
      const cart = await CartModel.findById(idCart);

      if(!cart) { throw new Error('Cart not found') }

      const prodIndex = cart.products.findIndex(p => p.product._id.toString() === idProd.toString());

      if (prodIndex !== -1){
        if (cart.products[prodIndex].quantity > 1) {
          cart.products[prodIndex].quantity -= 1;
          await cart.save();
        } else {
          const response = await CartModel.findByIdAndUpdate(
            idCart,
            { $pull: {products: { product: idProd }} },
            { new: true } 
          );
          return response;
        }} else {
          throw new Error('Product not found')
        };
        
    } catch (error) {
      console.log(error);
    }
  }


  async deleteCart(idCart) {
    try {
      const response = await CartModel.findByIdAndDelete(idCart);
      return response;
    } catch (error) {
      throw error;
    }
  }
}