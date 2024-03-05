const { ClientError } = require('../../utils/errors');

module.exports = (req, res, next) => {
    const { quantity } = req.body;
  const userId = req.headers['userid'];

  if (quantity && userId) return next();
  else throw new ClientError('Faltan datos', 401);
};
