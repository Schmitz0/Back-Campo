const { User, Client } = require('../../../db');
const response = require('../../../utils/response');

const includeOptions = {
  model: Client,
  attributes: { exclude: ['createdAt', 'updatedAt'] },
};

module.exports = async (req, res) => {
  const { id } = req.params;
  let users = []

  if(!id) users = await User.findAll({ include: includeOptions,      order: [['id', 'ASC']], });
  
  if(id) users = await User.findByPk(id, { include: includeOptions });
  
  response(res, 200, users);
};