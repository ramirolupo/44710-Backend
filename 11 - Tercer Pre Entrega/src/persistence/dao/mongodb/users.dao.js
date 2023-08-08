import { userModel } from './models/users.model.js';

export default class UserDao {

  async createUser(user) {
    try {
      const response = await userModel.create(user);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  
  async getUserById(id){
    try {
      const userExist = await userModel.findById(id)
      if (!userExist) return null;
      return userExist;
    } catch (error) {
      console.log(error)
    }
  }

  async getUserByEmail(email){
    try {
      const userExist = await userModel.findOne({email}); 
      if (!userExist) return null;
      return userExist;
    } catch (error) {
      console.log(error)
    }
  }


}