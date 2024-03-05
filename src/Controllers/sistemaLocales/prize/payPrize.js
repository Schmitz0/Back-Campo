const { response } = require('../../../utils');
const { Tickets, TicketNumber, Numbers, Cash, CommissionPercentage, Prize, User } = require('../../../db');
const { Sequelize, Op, literal } = require('sequelize');
const formatDate = require('../../../utils/formatDate');

module.exports = async (req, res) => {
  const userId = req.headers['userid'];
  const { validationCode, paymentMethod } = req.body;

  const user = await User.findOne({
    where: {
      id: userId
    }
  })

  const validTicket = await Tickets.findOne({
    where:{
      validationCode
    },
    include: {
        model:TicketNumber
    }
  })

    if (!validTicket)  return response(res, 200, 'Ticket inexistente');
    if (validTicket && validTicket.state === "Pagado") return response(res, 200, 'Ticket ya Pagado');
    if (validTicket && validTicket.state === "Expirado" ) return response(res, 200, 'Ticket Expirado');
    if (validTicket && validTicket.state === "Anular" || validTicket.state === "Pendiente" || validTicket.state === "Anulado") return response(res, 200, 'Ticket Anulado o en proceso de Anulacion');


    const validationLottery = await Numbers.findOne({
        where: {
            nameLottery: validTicket.lotteryName,
            hr: validTicket.lotteryHr,
            [Op.and]: [
                Sequelize.where(Sequelize.fn('DATE', Sequelize.col('day')), Sequelize.fn('DATE', validTicket.createdAt))
            ]
        }
    });
    
    if (!validationLottery) return response(res, 200, 'Ticket no ganador');
    
    const { number1, number2, number3 } = validationLottery.dataValues
    const ticketNumbers = validTicket.dataValues.TicketNumbers

    let total1 = 0
    let total2 = 0
    let total3 = 0

        if((ticketNumbers[0].number) === number1)  total1 =  ticketNumbers[0].bet * user.dataValues.firstPrize;
        if((ticketNumbers[1].number) === number2)  total2 = ticketNumbers[1].bet * user.dataValues.SecondPrize;
        if((ticketNumbers[2].number) === number3) total3 = ticketNumbers[2].bet * user.dataValues.ThirdPrize;

        if ((total1+total2+total3) === 0) return response(res, 200, 'Ticket no ganador');
  
    await Cash.create({
        type: 'EGRESO',
        quantity: -(total1+total2+total3),
        state: 'RESUELTO',
        idTicket: validTicket.dataValues.idTicket,
        userId: userId,
        detail:"PAGO DE TICKET",
        firstPrize: total1,
        SecondPrize: total2,
        ThirdPrize:total3,
        paymentCommissionPercentage: (user.dataValues.paymentCommissionPercentage /100) * (total1+total2+total3),
        paymentMethod:paymentMethod,
      });
    
    
    await validTicket.update({ state: "Pagado",stateAdmin:null });
    const data = 'registros creados exitosamente';
    response(res, 200, data);
};
