const { response } = require('../../../utils');
const { Tickets, TicketNumber, Numbers,User } = require('../../../db');
const { Op, Sequelize } = require('sequelize');

module.exports = async (req, res) => {
  try {
    const userId = req.headers['userid'];

    const ticketsWithMatchingNumbers = await Tickets.findAll({
      where: {
        state: "Activo",
        stateAdmin:null,
        createdAt: {
          [Op.gte]: new Date(new Date() - 24 * 60 * 60 * 1000),
        },
      },
      include: {
        model: TicketNumber,
      },
    });

    const matchingNumbersInDatabase = await Numbers.findAll({
      where: {
        day: {
          [Op.gte]: new Date(new Date() - 24 * 60 * 60 * 1000),
        },
      },
    });

    const matchingTickets = [];

    for (const ticket of ticketsWithMatchingNumbers) {
      const matchingNumbers = ticket.TicketNumbers.map((ticketNumber) => ticketNumber.number);
      const matchingBets = ticket.TicketNumbers.map((c) => c.bet);

      const user = await User.findOne({
        where: {
          id: ticket.dataValues.userId,
        },
      });


      const validationLottery = await Numbers.findOne({
        where: {
            nameLottery: ticket.lotteryName,
            hr: ticket.lotteryHr,
            day:{
              [Op.and]: [
                Sequelize.where(Sequelize.fn('DATE', Sequelize.col('day')), Sequelize.fn('DATE', ticket.createdAt))
            ]
          }
        }
    });


    if(validationLottery) {
    
    const { number1, number2, number3 } = validationLottery?.dataValues;

    let total1 = 0
    let total2 = 0
    let total3 = 0

        if((matchingNumbers[0]) === number1)  total1 =  matchingBets[0] * user.dataValues.firstPrize;
        if((matchingNumbers[1]) === number2)  total2 = matchingBets[1] * user.dataValues.SecondPrize;
        if((matchingNumbers[2]) === number3) total3 = matchingBets[2] * user.dataValues.ThirdPrize;

        // Update the ticket with the total prize
        console.log(total1,total2,total3);

        if((total1+total2+total3) > 0){
        await ticket.update({
          stateAdmin: "GNC",
          winningPrize: total1 + total2 + total3,
        });
      }
    } 
    }

    response(res, 200, matchingTickets);
  } catch (error) {
    console.error(error);
    response(res, 500, { error: 'Internal Server Error' });
  }
};

