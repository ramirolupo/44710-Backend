import CartsDaoMongoDB from "../dao/mongodb/carts.dao.js";
const cartsDao = new CartsDaoMongoDB();

export const getAllCarts = async () => {
    try {
      const carts = await cartsDao.getAllCarts();
      if (!carts) throw new Error("Cart not found!");
      else return carts;
    } catch (error) {
      console.log(error);
    }
  };

  export const getCartById = async (id) => {
    try {
      const cart = await cartsDao.getCartById(id);
      if (!cart) throw new Error("Validation Error!");
      else return cart;
    } catch (error) {
      console.log(error);
    }
  };

  export const createCart = async (obj) => {
    try {
      const cart = await cartsDao.createCart(obj);
      if (!cart) throw new Error("Validation Error!");
      else return cart;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const updateCart = async (id, obj) => {
    try {
      const cart = await cartsDao.getCartById(id);  
      if (!cart) {
        throw new Error("Cart not found!");
      } else {
        const cartUpdated = await cartsDao.updateCart(id, obj);
        return cartUpdated;
      }
    } catch (error) {
      console.log(error);
    }
  };

  export const updateProductCart = async (idCart, idProd, quantity) => {
    try {
      const cart = await cartsDao.getCartById(idCart);
      if (!cart) {
        throw new Error("Cart not found!");
      } else {
        const cartUpdated =  cartsDao.updateProductCart(idCart, idProd,  quantity);
        return cartUpdated;
      }
    } catch (error) {
      console.log(error);
    }
  };

  export const deleteCartProducts = async (id) => {
    try {
        const productsDeleted = await cartsDao.deleteCartProducts(id);
        return productsDeleted;
    } catch (error) {
      console.log(error);
    }
  };


  
  export const deletePet = async (id) => {
    try {
        const petDeleted = await cartsDao.deletePet(id);
        return petDeleted;
    } catch (error) {
      console.log(error);
    }
  };
