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
    const docs = await getAllProducts();
    res.json(docs);
  } catch (error) {
    next(error);
  }
};

export const getByIdProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const doc = await getByIdProduct(id);
    res.json(doc);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { brand, model, description, price, stock } = req.body;
    const newDoc = await createProduct({
      brand,
      model,
      description,
      price,
      stock
    });
    res.json(newDoc);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { brand, model, description, price, stock } = req.body;
    await getByIdProduct(id);
    const docUpd = await updateProduct(id, {
      brand, model, description, price, stock
    });
    res.json(docUpd);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteProduct(id);
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
