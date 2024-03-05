const { response } = require('../../../utils');
const { Tickets,Cash } = require('../../../db');

module.exports = async (req, res) => {
  const { id } = req.params;
  // const { state } = req.body;
  const userId = req.headers['userid'];
  let data = ''

  const ticketToPatch = await Tickets.findOne({
    where: { idTicket: id, userId: userId }
  });

  const cashToPatch = await Cash.findOne({
    where: { idTicket: id, userId: userId }
  })
  
  if (ticketToPatch) {
    await ticketToPatch.update({ state: "Pendiente" });
    await cashToPatch.update({ state: "ANULADO" });
    data = 'Modificacion del estado Correcta';
  } else { data = 'Ticket no encontrado'}

  response(res, 200, data);
};
