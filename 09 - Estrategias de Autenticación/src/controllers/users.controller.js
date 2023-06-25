import * as service from '../services/users.services.js';

export const createUser = async (req, res) => {
    try {
      const newUser = await service.createUser(req.body)
      if(newUser) {
          res.json({ message: 'Usuario creado con éxito!' });
      } else {
          res.json({ message: 'El usuario ya existe.' });
      }
    } catch (error) {
      next(error);
    }
  }


  export const loginUser =  async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await service.loginUser(req.body);
        if(user) {
            req.session.email = email;
            req.session.password = password;
            res.json({ message: 'Usuario logeado correctamente!' });
        } else {
            res.json({ message: 'Usuario/Contraseña Incorrectos.' });
        }
    } catch (error) {
        next(error);
    }
}


export const logout = async (req, res) => {
    req.session.destroy((err) => {
      if (!err) res.send('Logout ok!');
      else res.send({ status: 'Logout ERROR', body: err });
    });
}
