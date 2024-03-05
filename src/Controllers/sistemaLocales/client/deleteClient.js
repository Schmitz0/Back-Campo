const { Client } = require('../../../db');
const response = require('../../../utils/response');

module.exports = async (req, res) => {
  const { id } = req.params
  
  const newClient = await Client.findByPk(id);
  if (!newClient) response(res, 404, 'Cliente no encontrado');

  if (newClient) await newClient.destroy()

  response(res, 200, `El cliente ${newClient.name} ${newClient.surname} ha sido borrado`);
};
