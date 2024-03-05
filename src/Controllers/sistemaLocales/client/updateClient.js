const { Client } = require('../../../db');
const response = require('../../../utils/response');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { name, surname, email, phone, genre, birthDate } = req.body;

  const clientToUpdate = await Client.findByPk(id);

  await clientToUpdate.update({
    name,
    surname,
    email,
    phone,
    genre,
    birthDate,
  });
  response(
    res,
    200,
    `El cliente ${clientToUpdate.name} ${clientToUpdate.surname} ha sido modificado`
  );
};