import UserDao from "../dao/mongodb/users.dao";

const userDao = new UserDao();

export const createUser = async (user) => {
    try {

        return await userDao.createUser(user);

    } catch (error) {

      console.log(error);

    }
};


export const loginUser = async (user) => {
    try {

        return await userDao.loginUser(user);

    } catch (error) {
        
        console.log(error);
    }
};