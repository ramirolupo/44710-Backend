import CartsDaoMongoDB from "../persistence/dao/mongodb/carts.dao.js";
import TicketsDaoMongoDB from "../persistence/dao/mongodb/tickets.dao.js";
const cartsDao = new CartsDaoMongoDB();
const ticketsDao = new TicketsDaoMongoDB();


export const purchase = async (idCart) => {
    try {
        let remainingProds = [];
        let amount;
        const cart = await cartsDao.getCartById(idCart);
        if (!cart) {
            return null;
        } else {
            for (const item of cart.products) {
                const product = item.product;
                const quantityInCart = item.quantity;
                if (!product || product.stock < quantityInCart) {
                    remainingProds.push(product._id); //como borro los productos ya comprados y como dejo los que tuvieron error?
                }
                product.stock -= quantityInCart; 
                amount += product.price;
              }
            // const ticket = { 
            //   amount: amount,
            //   purchaser: req.user //esta bien utilizado el req.user.email?
            //  }
            //  console.log(ticket);
            //  await ticketsDao.createTicket(ticket);
            //  // como asigno al ticket los datos?
        }
    } catch (error) {
      throw new Error(error.message);
    }
}


export const getAllCarts = async () => {
    try {
      const carts = await cartsDao.getAllCarts();
      if (!carts) return null;
      else return carts;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  export const getCartById = async (id) => {
    try {
      const cart = await cartsDao.getCartById(id);
      if (!cart) return null;
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  export const createCart = async (obj) => {
    try {
      const cart = await cartsDao.createCart(obj);
      if (!cart) return null;
      else return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  export const updateCart = async (id, obj) => {
    try {
      const cart = await cartsDao.getCartById(id);  
      if (!cart) {
        return null;
      } else {
        const cartUpdated = await cartsDao.updateCart(id, obj);
        return cartUpdated;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  export const updateProductCart = async (idCart, idProd, quantity) => {
    try {
      const cart = await cartsDao.getCartById(idCart);
      if(!cart) return null;
        const prodIndex = cart.products.findIndex(p => p.product._id.toString() === idProd.toString());
      if (prodIndex !== -1) {
        cart.products[prodIndex].quantity += quantity;
      } else {
        cart.products.push({ product: idProd, quantity: quantity }) 
      }                         
      await cart.save();                            
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  export const deleteCartProducts = async (idCart) => {
      try {
        const response = await cartsDao.getCartById(idCart);
        if (!response) return null;
          response.products = [];
          await response.save();
          return response;
      } catch (error) {
         throw new Error(error.message);
      }
    };

  export const deleteProductFromCart = async (idCart, idProd) => {
      try {
        const cart = await cartsDao.getCartById(idCart);
        if(!cart) return null;
          const prodIndex = cart.products.findIndex(p => p.product._id.toString() === idProd.toString());
          if (prodIndex !== -1){
            if (cart.products[prodIndex].quantity > 1) {
              cart.products[prodIndex].quantity -= 1;
              await cart.save();
            } else {
              const response = await cartsDao.updateCart( //tengo dudas aca, esta bien el obj del update?
                idCart,
                { $pull: {products: { product: idProd }} },
                { new: true } 
              );
              return response;
            }} else {
              return null;
            };
          
      } catch (error) {
        throw new Error(error.message);
      }
    };

  export const deleteCart = async (idCart) => {
    try {
        const cart = await cartsDao.deleteCart(idCart);
        return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  };

