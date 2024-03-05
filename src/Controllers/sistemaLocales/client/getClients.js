const { response } = require('../../../utils');
const { Client, Tickets,TicketNumber } = require('../../../db');

const includeOptions = [
  {
    model: TicketNumber,
    attributes: ['bet', 'number'],
  },
];

module.exports = async (req, res) => {
  const { id } = req.params;
  const userId = req.headers['userid'];

  try {
    let clients;

    if (!id) {
      clients = await Client.findAll({
        include: [
          {
            model: Tickets,
            include: includeOptions,
          },
          
        ],
        order: [['createdAt', 'DESC']],
      });

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
            include: includeOptions,
          },
        ],
        where:{userId:userId},
      });

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
