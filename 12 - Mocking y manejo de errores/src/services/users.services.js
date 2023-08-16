import { createHash, isValidPassword } from '../utils/utils.js';
import UserDao from '../persistence/dao/mongodb/users.dao.js';
const userDao = new UserDao;

export const createUser = async (user) => {
    try {
        const { email, password } = user;
        const existUser = await userDao.getUserByEmail(email);
        if(!existUser){
          if(email === 'adminCoder@coder.com' && password === 'adminCoder123'){
            const newUser = await userDao.createUser({...user, password: createHash(password), role: 'admin'})
            return newUser;
          } else {
            const newUser = await userDao.createUser({...user, password: createHash(password)})
            return newUser;
          }    
        } else {
            return null;
        }
      } catch (error) {
        throw new Error(error.message);
      }
};

export const loginUser = async (user) => {
    try {
      const { email, password } = user;
      const userExist = await userDao.getUserByEmail(email);
      if(userExist){
        const passValid = isValidPassword(userExist, password)
        if(!passValid) return null
        else return userExist
      } return null;
    } catch (error) {
      throw new Error(error.message);
    }
  };

export const getUserById = async (id) => {
    try {
      const cart = await userDao.getUserById(id);
      if (!cart) return null;
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  export const getUserByEmail = async (email) => {
    try {
      const cart = await userDao.getUserByEmail(email);
      if (!cart) return null;
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  };
