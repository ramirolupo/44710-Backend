import { createHash, isValidPassword } from '../utils.js';
import UserDao from '../persistence/dao/mongodb/users.dao.js';
const userDao = new UserDao;

export const createUser = async (user) => {
    try {
        const { email, password } = user;
        const existUser = await userDao.getUserByEmail(email);
        if(existUser){
          if(email === 'adminCoder@coder.com' && password === 'adminCoder123'){
            const newUser = await userDao.createUser({...user, password: createHash(password), role: 'admin'})
            return newUser;
          } else {
            const newUser = await userDao.createUser({...user, password: createHash(password)})
            return newUser;
          }    
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
      } catch (error) {
        console.log(error)
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
      } return res.status(404).json({ message: 'User not found' });
    } catch (error) {
      console.log(error)
    }
  };

export const getUserById = async (id) => {
    try {
      const cart = await cartsDao.getUserById(id);
      if (!cart) return res.status(404).json({ message: 'User not found' });
      return cart;
    } catch (error) {
      console.log(error);
    }
  };

  export const getUserByEmail = async (email) => {
    try {
      const cart = await cartsDao.getUserByEmail(email);
      if (!cart) return res.status(404).json({ message: 'User not found' });
      return cart;
    } catch (error) {
      console.log(error);
    }
  };
