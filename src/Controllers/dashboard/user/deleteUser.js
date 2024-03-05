const { User } = require('../../../db');
const response = require('../../../utils/response');

module.exports = async (req, res) => {
  const { id } = req.params
  // console.log(id);
  const user = await User.findByPk(id);
  if (!user) response(res, 404, 'Usuario no encontrado');

  if (user) await user.destroy()

  response(res, 200, user);
};
