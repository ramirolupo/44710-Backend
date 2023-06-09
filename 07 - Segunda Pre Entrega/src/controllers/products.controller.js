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
    const { id } = req.params;
    const product = await service.getByIdProduct(id);
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
    const { id } = req.params;
    const { brand, model, description, price, stock } = req.body;
    await service.getByIdProduct(id);
    const prodUpd = await service.updateProduct(id, {
      brand, model, description, price, stock
    });
    res.json(prodUpd);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await service.deleteProduct(id);
    res.json({message: 'Product deleted successfully!'})
  } catch (error) {
    next(error);
  }
};

export const aggregation1 = async(req, res, next)=>{
  try {
    const response = await service.aggregation1();
    res.json(response);
  } catch (error) {
    next(error)
  }
}
