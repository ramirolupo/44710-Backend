import { ProductModel } from "./models/products.model.js";

export default class ProductDaoMongoDB {

  async getAllProducts(page = 1, limit = 10, sort, query) {
    try{
      let result;

      if (query) {
        result = await ProductModel.aggregate([
          { $match: query },
          { $sort: { price: sort }},
          { $skip: (page - 1) * limit },
          { $limit: limit }
        ]);
      } else {
        result = await ProductModel.paginate({}, { page, limit, sort: { price: sort }});
      }
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    try {
      const response = await ProductModel.findById(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async createProduct(obj) {
    try {
      const response = await ProductModel.create(obj);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id, obj) {
    try {
      await ProductModel.updateOne({_id: id}, obj);
      return obj;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      const response = await ProductModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async aggregation1(){
    try {
      const response = await UserModel.aggregate([
        {
          $group: {
            _id: '$brand'
          }
        },
        {
          $sort: {
            price: -1
          }
        }
      ])
      return response;
    } catch (error) {
      console.log(error);
    }
  }


}