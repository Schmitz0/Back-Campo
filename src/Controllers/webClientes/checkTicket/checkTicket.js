const { response } = require('../../../utils');
const { Tickets, TicketNumber, Numbers,User } = require('../../../db');
const { Sequelize, Op, literal } = require('sequelize');

module.exports = async (req, res) => {
  const userId = req.headers['userid'];
  const { validationCode } = req.body;


let firstPrize = 30;
let SecondPrize = 20;
let ThirdPrize = 10;

if (userId) {
  // Si se envía userid en los headers, busca el usuario y actualiza los premios
  const user = await User.findOne({
    where: {
      id: userId
    }
  });

  if (user) {
    firstPrize = user.dataValues.firstPrize;
    SecondPrize = user.dataValues.SecondPrize;
    ThirdPrize = user.dataValues.ThirdPrize;
  }
}


  const validTicket = await Tickets.findOne({
    where: {
      validationCode
    },
    include: {
      model: TicketNumber
    }
  })

  if (!validTicket) return response(res, 200, 'Ticket inexistente');
  if (validTicket && validTicket.state === "Pagado") return response(res, 200, 'Ticket ya Pagado');
  if (validTicket && validTicket.state === "Expirado") return response(res, 200, 'Ticket Expirado');
  if (validTicket && (validTicket.state === "Anular" || validTicket.state === "Pendiente" || validTicket.state === "Anulado")) return response(res, 200, 'Ticket Anulado o en proceso de Anulacion');

  const validationLottery = await Numbers.findOne({
    where: {
      nameLottery: validTicket.lotteryName,
      hr: validTicket.lotteryHr,
      [Op.and]: [
        Sequelize.where(Sequelize.fn('DATE', Sequelize.col('day')), Sequelize.fn('DATE', validTicket.createdAt))
      ]
    }
  });

  if (!validationLottery) return response(res, 200, { ticket: validTicket, message: 'Ticket no ganador' });

  const { number1, number2, number3 } = validationLottery.dataValues
  const ticketNumbers = validTicket.dataValues.TicketNumbers

  let total1 = 0
  let total2 = 0
  let total3 = 0

  if ((ticketNumbers[0].number) === number1) total1 = ticketNumbers[0].bet * firstPrize;
  if ((ticketNumbers[1].number) === number2) total2 = ticketNumbers[1].bet * SecondPrize;
  if ((ticketNumbers[2].number) === number3) total3 = ticketNumbers[2].bet * ThirdPrize;

  const totalPago = total1 + total2 + total3

  const ticketData = { ticket: validTicket,pago:totalPago };

  if ((total1 + total2 + total3) === 0) {
return response(res, 200, { ...ticketData, message: 'Ticket no ganador' });
  }

  return response(res, 200, { ...ticketData, message: 'Ticket ganador'});
};