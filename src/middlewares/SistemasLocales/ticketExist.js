const { ClientError } = require('../../utils/errors');

module.exports = (req, res, next) => {
  const { validationCode } = req.body;

  if (validationCode) return next();
  else throw new ClientError('Ingresar un Ticket', 401);
};
