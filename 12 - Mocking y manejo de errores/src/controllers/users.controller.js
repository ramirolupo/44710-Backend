import * as service from "../services/users.services.js";

export const registerResponse = async(req, res, next)=>{
  try {
        const user = await service.getUserById(req.session.passport.user); //o esta aca el error?
        const { email, cart } = user;
        res.json({
            msg: 'Register OK',
            user: {
                email,
                cart
            }
        });
  } catch (error) {
      next(error);
  }
};

export const loginResponse = async(req, res, next)=>{
    try {
        const user = await service.getUserById(req.session.passport.user); //esto te da el id?
        const { first_name, last_name, email, age, role } = user;
        res.json({
            msg: 'Login OK',
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

export const loginAuthenticate = async(req, res, next)=>{
    try {
        const user = await service.getUserById(req.session.passport.user);
        const { email } = user;
        res.json({
            msg: `The user ${email} is logged in`
        });
    } catch (error) {
        next(error);
    }
};

export const githubResponse = async(req, res, next)=>{
    try {
        const { first_name, last_name, email, role, isGithub } = req.user;
        res.json({
            msg: 'Register/Login Github OK',
            userData: {
                first_name,
                last_name,
                email,
                role,
                isGithub
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
