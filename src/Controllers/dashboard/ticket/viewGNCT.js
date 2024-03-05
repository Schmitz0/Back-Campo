const { response } = require('../../../utils');
const { Tickets, TicketNumber, User } = require('../../../db');
const { Op } = require('sequelize');

const includeOptions = [
  {
    model: TicketNumber,
    attributes: ['bet', 'number'],
  },
];

module.exports = async (req, res) => {
  const userId = req.headers['userid'];

  try {
    const tickets = await Tickets.findAll({
      where: {
        stateAdmin: "GNC",
        state: ["Activo", "Expirado"],
        createdAt: {
          [Op.gte]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
        },
      },
      include: includeOptions,
      order: [['createdAt', 'DESC']],
    });

    // Obtener la cantidad total de tickets
    const totalTickets = await Tickets.count({
      where: {
        stateAdmin: "GNC",
        state: ["Activo", "Expirado"],
        createdAt: {
          [Op.gte]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    });

    // Obtener el monto total de los tickets
    const totalAmount = await Tickets.sum('total', {
      where: {
        stateAdmin: "GNC",
        state: ["Activo", "Expirado"],
        createdAt: {
          [Op.gte]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    });

    response(res, 200, {
      tickets,
      totalTickets,
      totalAmount,
    });
  } catch (error) {
    console.error(error);
    response(res, 500, { error: 'Internal Server Error' });
  }
};
