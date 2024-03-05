const { response } = require('../../../utils');
const { Client, Tickets, sequelize } = require('../../../db');
const { where } = require('sequelize');

module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    let clients;

    if (!id) {
      clients = await Client.findAll({
        include: [
          {
            model: Tickets,
          },
          
        ],
      });

      // Calculate total tickets and total amount spent for each client
      clients = clients.map(client => {
        const totalTickets = client.Tickets.length;
        const totalAmountSpent = client.Tickets.reduce((total, ticket) => total + ticket.total, 0);

        return {
          ...client.toJSON(),
          totalTickets,
          totalAmountSpent,
        };
      });
    }

    if (id) {
      clients = await Client.findByPk(id, {
        include: [
          {
            model: Tickets,
          },
        ],
        // where:{userId:userId}
      });

      // Calculate total tickets and total amount spent for the specific client
      const totalTickets = clients.Tickets.length;
      const totalAmountSpent = clients.Tickets.reduce((total, ticket) => total + ticket.total, 0);

      clients = {
        ...clients.toJSON(),
        totalTickets,
        totalAmountSpent,
      };
    }

    response(res, 200, clients);
  } catch (error) {
    console.error('Error:', error);
    response(res, 500, { error: 'Internal Server Error' });
  }
};
