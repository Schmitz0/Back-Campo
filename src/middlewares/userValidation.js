const { User } = require('../db');
const { ClientError } = require('../utils/errors');

module.exports = async (req, res, next) => {
  const { email, password, name } = req.body;
  if (email && password && name) return next();
  else throw new ClientError('Ingresar credenciales válidas', 401);
};
