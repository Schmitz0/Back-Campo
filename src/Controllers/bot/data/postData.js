const { response } = require('../../../utils');
const moment = require("moment");
const { Op } = require("sequelize");
const { Tickets, TicketNumber, Cash, User, Client } = require("../../../db");

module.exports = async (req, res) => {
  const { phoneNumber } = req.body;

  console.log(phoneNumber);

  const startDate = moment().startOf("day").toDate();
  const endDate = moment(startDate).endOf("day").toDate();

  // Buscar tickets del cliente para la fecha actual
  const client = await Client.findAll({
    where: {
      phone: phoneNumber,
    },
  });

  console.log(client);


  // Buscar tickets del cliente para la fecha actual
  const tickets = await Tickets.findAll({
    where: {
      clientId: client[0].clientId,
      createdAt: {
        [Op.and]: [
          { [Op.gte]: startDate },
          { [Op.lt]: new Date(endDate.setDate(endDate.getDate() + 1)) },
        ],
      },
    },
    include: [{ model: TicketNumber }],
  });

  response(res, 200, tickets);
};
