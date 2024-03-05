const { ClientError } = require('../../utils/errors');

module.exports = (req, res, next) => {
  const { apuestas } = req.body;

  if (apuestas && apuestas.length > 0) return next();
  else throw new ClientError('Ingresar credenciales válidas', 401);
};
