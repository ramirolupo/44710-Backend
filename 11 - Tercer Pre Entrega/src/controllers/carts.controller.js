import * as service from "../services/carts.services.js";


export const purchase = async (req, res, next) => {
  try {
    const { idCart } = req.params;
    await service.purchase(idCart);
    return res.status(200).json({ message: 'Purchase successful' });
  } catch (error) {
    console.error('There was an error during the purchase: ', err);
    return res.status(500).json({ message: 'An error occurred while completing the purchase.' });
  }
}
  
export const getAllCarts = async (req, res, next) => {
  try {
    const response = await service.getAllCarts();
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const getCartById = async (req, res, next) => {
  try {
    const { idCart } = req.params;
    const product = await service.getCartById(idCart);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const createCart = async (req, res, next) => {
  try {
    const { product, quantity } = req.body;
    const newCart = await service.createCart({
      product,
      quantity
    });
    res.json(newCart);
  } catch (error) {
    next(error);
  }
};

export const updateCart = async (req, res, next) => {
  try {
    const { idCart } = req.params;
    const { product, quantity } = req.body;
    await service.getByIdProduct(idCart);
    const cartUpd = await service.updateCart(idCart, {
        product, quantity
    });
    res.json(cartUpd);
  } catch (error) {
    next(error);
  }
};


export const updateProductCart = async (req, res, next) => {
  try {
    const { idCart, idProd } = req.params;
    const { quantity } = req.body;
    const newCart = await service.updateProductCart(idCart, idProd, quantity);
    if (!newCart) throw new Error("Validation Error!");
    else
      res.json(newCart);
  } catch (error) {
    next(error);
  }
};


export const deleteCartProducts = async (req, res, next) => {
  try {
    const { idCart } = req.params;
    await service.deleteCartProducts(idCart);
    res.json({message: 'Products deleted successfully!'})
  } catch (error) {
    next(error);
  }
};

export const deleteProductFromCart = async (req, res, next) => {
    try {
        const { idCart, idProd } = req.params;
        await service.deleteProductFromCart(idCart, idProd);
        res.json({message: 'Product deleted successfully!'})
    } catch (error) {
        next(error);
    }
};


export const deleteCart = async (req, res, next) => {
    try {
        const { idCart } = req.params;
        await service.deleteCart(idCart);
        res.json({message: 'Cart deleted successfully!'})
    } catch (error) {
        next(error);
    }
};

