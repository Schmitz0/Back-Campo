const { response } = require('../../../utils');
const { Tickets, TicketNumber } = require('../../../db');
const { Op } = require('sequelize');

const includeOptions = [
  {
    model: TicketNumber,
    attributes: ['bet', 'number'],
  },
];

module.exports = async (req, res) => {
  const userId = req.headers['userid'];
  const { clientId, selectHr, selectLottery, date } = req.body;

  let tickets = [];
  let today = new Date(date);
  today.setHours(today.getHours() - 3);

  if(!userId) tickets = await Tickets.findAll()
  
  if (userId) {
    tickets = await Tickets.findAll({
      where: {
        userId,
      },
        include: includeOptions,
        order: [['createdAt', 'DESC']],
    });
  }

  response(res, 200, tickets);
};
