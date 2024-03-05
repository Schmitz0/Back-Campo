const { ClientError } = require('../../utils/errors');

module.exports = (req, res, next) => {
  const { id } = req.params;
  const userId = req.headers['userid'];

  if (id && userId) return next();
  else throw new ClientError('Ticket no encotrnado', 401);
};
