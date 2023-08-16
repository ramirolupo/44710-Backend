import { userModel } from './models/users.model.js';

export default class UserDao {

  async createUser(user) {
    try {
      const response = await userModel.create(user);
      return response;
    } catch (error) {
      throw new Error(error.message);;
    }
  }
  
  async getUserById(id){
    try {
      const userExist = await userModel.findById(id)
      if (!userExist) return null;
      return userExist;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getUserByEmail(email){
    try {
      const userExist = await userModel.findOne({email}); 
      if (!userExist) return null;
      return userExist;
    } catch (error) {
      throw new Error(error.message);
    }
  }


}