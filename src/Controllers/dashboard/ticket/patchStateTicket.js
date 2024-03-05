const { response } = require('../../../utils');
const { Tickets } = require('../../../db');

module.exports = async (req, res) => {
  const { id } = req.params;
  let data = ''

  const ticketToPatch = await Tickets.findOne({
    where: { idTicket: id }
  });
  
  if (ticketToPatch) {
    await ticketToPatch.update({ state: "Anulado" });
    data = 'Modificacion del estado Correcta';
  } else { data = 'Ticket no encontrado'}

  response(res, 200, data);
};
