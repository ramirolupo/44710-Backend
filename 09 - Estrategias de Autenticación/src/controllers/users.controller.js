import UserDao from "../dao/mongodb/users.dao.js";

const userDao = new UserDao();


export const registerResponse = (req, res, next)=>{
  try {
      res.json({
          msg: 'Register OK',
          session: req.session
      })
  } catch (error) {
      next(error);
  }
};

export const loginResponse = async(req, res, next)=>{
  try {
      const user = await userDao.getById(req.session.passport.user);
      const { first_name, last_name, email, age, role } = user;
      res.json({
          msg: 'Login OK',
          session: req.session,
          userData: {
              first_name,
              last_name,
              email,
              age,
              role
          }
      })
  } catch (error) {
      next(error);
  }
};


export const logout = async (req, res) => {
    req.session.destroy((err) => {
      if (!err) res.send('Logout ok!');
      else res.send({ status: 'Logout ERROR', body: err });
    });
};
