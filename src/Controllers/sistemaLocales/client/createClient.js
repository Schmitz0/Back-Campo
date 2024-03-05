const { response } = require('../../../utils');
const { Client } = require('../../../db');

module.exports = async (req, res) => {
  const userId = req.headers['userid'];

  const { name, surname, email, phone, genre, birthDate } = req.body;
  const newClient = await Client.create({ name, surname, email, phone, genre, birthDate, userId });
  response(res, 200, newClient);
};
