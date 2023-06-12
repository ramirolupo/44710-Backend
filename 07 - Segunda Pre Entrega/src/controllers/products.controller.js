import * as service from "../services/products.services.js";
  
export const createFileCtr = async (req, res, next) => {
  try {
    const newProduct = await service.createFileProduct();
    if (!newProduct) throw new Error("Validation Error!");
    else
      res.json(newProduct);
  } catch (error) {
    next(error);
  }
};


export const getAllProducts = async (req, res, next) => {
  try {
    const { page, limit, sort, query } = req.query;
    const response = await service.getAllProducts(page, limit, sort, query);
    console.log(response);
    const next = response.hasNextPage ? `http://localhost:8080/products?page=${response.nextPage}` : null
    const prev = response.hasPrevPage ? `http://localhost:8080/products?page=${response.prevPage}` : null
    const status = res.statusCode === 200 ? 'Success' : 'Error';
    res.json({
      status: status,
      payload: response.docs,
      totalPages: response.totalPages,
      page: response.page,
      hasPrevPage: response.hasPrevPage,
      hasNextPage: response.hasNextPage,
      prevLink: prev,
      nextLink: next
    });
  } catch (error) {
    next(error);
  }
};

export const getByIdProduct = async (req, res, next) => {
  try {
    const { idProd } = req.params;
    const product = await service.getByIdProduct(idProd);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { brand, model, description, price, stock } = req.body;
    const newProd = await service.createProduct({
      brand,
      model,
      description,
      price,
      stock
    });
    res.json(newProd);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { idProd } = req.params;
    const { brand, model, description, price, stock } = req.body;
    await service.getByIdProduct(idProd);
    const prodUpd = await service.updateProduct(idProd, {
      brand, model, description, price, stock
    });
    res.json(prodUpd);
  } catch (error) {
    next(error);
  }
};


export const addProductToCart = async (req, res, next) => {
  try {
    const { idProd } = req.params;
    const { idCart } = req.params;
    const newCart = await service.addProductToCart(idProd, idCart);
    if (!newCart) throw new Error("Validation Error!");
    else
      res.json(newCart);
  } catch (error) {
    next(error);
  }
};


export const deleteProduct = async (req, res, next) => {
  try {
    const { idProd } = req.params;
    await service.deleteProduct(idProd);
    res.json({message: 'Product deleted successfully!'})
  } catch (error) {
    next(error);
  }
};
