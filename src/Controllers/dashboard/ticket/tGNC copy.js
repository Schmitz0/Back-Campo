const { response } = require("../../../utils");
const { Tickets, TicketNumber, Numbers, User } = require("../../../db");
const { Op, Sequelize } = require("sequelize");

module.exports = async (req, res) => {
  try {
    const userId = req.headers["userid"];

    const ticketsWithMatchingNumbers = await Tickets.findAll({
      where: {
        state: "Activo",
        createdAt: {
          [Op.gte]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
        },
      },
      include: {
        model: TicketNumber,
      },
    });

    // Obtener todos los números relevantes de la última semana
    const matchingNumbersInDatabase = await Numbers.findAll({
      where: {
        day: {
          [Op.gte]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    });

    const matchingTickets = [];

    // Inicializar la variable total fuera del bucle

    for (const ticket of ticketsWithMatchingNumbers) {
      const matchingNumbers = ticket.TicketNumbers.map(
        (ticketNumber) => ticketNumber.number
      );
      const matchingBets = ticket.TicketNumbers.map((c) => c.bet);

      const user = await User.findOne({
        where: {
          id: ticket.dataValues.userId,
        },
      });

      // Reiniciar la variable total para cada ticket
      let total = 0;

      // Verificar que al menos un número del ticket esté en la lista de números relevantes
      const atLeastOneNumberMatches = matchingNumbers.some((number, index) => {
        return matchingNumbersInDatabase.some((dbNumber) => {
          const ticketDate = new Date(
            ticket.createdAt.toISOString().split("T")[0]
          );
          const dbNumberDate = new Date(
            dbNumber.day.toISOString().split("T")[0]
          );

          // Ajuste en la comparación de fechas, considerando solo la fecha sin la hora
          if (
            dbNumber.nameLottery === ticket.lotteryName &&
            dbNumber.hr === ticket.lotteryHr &&
            ticketDate.toISOString().split("T")[0] ===
              dbNumberDate.toISOString().split("T")[0] &&
              (dbNumber.number1 === number || dbNumber.number2 === number || dbNumber.number3 === number)
          ) {
            // Verificar si dbNumber.number1, dbNumber.number2, o dbNumber.number3 es igual a 'number'
            if (dbNumber.number1 === number) {
              // Sumar el valor a la variable total multiplicado por la apuesta
              total += user.dataValues.firstPrize * matchingBets[index];
              return true; // Indicar que hay una coincidencia
            } else if (dbNumber.number2 === number) {
              // Sumar el valor a la variable total multiplicado por la apuesta
              total += user.dataValues.secondPrize * matchingBets[index];
              return true; // Indicar que hay una coincidencia
            } else if (dbNumber.number3 === number) {
              // Sumar el valor a la variable total multiplicado por la apuesta
              total += user.dataValues.thirdPrize * matchingBets[index];
              return true; // Indicar que hay una coincidencia
            }
          }

          return false; // Devolver false si la verificación falla
        });
      });

      if (atLeastOneNumberMatches) {
        matchingTickets.push(ticket);

        // Actualizar el campo winningPrize del modelo Ticket con el valor total
        await ticket.update({
          stateAdmin: "GNC",
          winningPrize: total,
        });
      }
    }

    response(res, 200, matchingTickets);
  } catch (error) {
    console.error(error);
    response(res, 500, { error: "Internal Server Error" });
  }
};
