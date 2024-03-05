const { ClientError } = require('../utils/errors');

module.exports = (req, res, next) => {
  const { email, password } = req.body;
  if (email && password) return next();
  else throw new ClientError('Ingresar credenciales válidas', 401);
};
