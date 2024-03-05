const {
  response,
  validationCode,
  sendWhatsAppMessage,
} = require("../../../utils");
const { Tickets, TicketNumber, Cash, User, Client } = require("../../../db");
const { v4: uuidv4 } = require("uuid");

module.exports = async (req, res) => {
  const userId = req.headers["userid"];

  const { apuestas, clientId, paymentMethod, hrClient } = req.body;

  const user = await User.findOne({
    where: {
      id: userId,
    },
  });

  const clientInfo = await Client.findOne({
    where: {
      clientId: clientId,
    },
  });

  for (const apuesta of apuestas) {
    let totalTicket = 0;

    const { number, bet, hr, lottery, hrLottery } = apuesta;

    for (let i = 0; i < number.length; i++) {
      totalTicket += bet[i];
    }

    let ticket = await Tickets.create({
      clientId: clientId,
      userId: userId,
      state: "Activo",
      lotteryName: lottery,
      lotteryHr: hr,
      total: totalTicket,
      validationCode: await validationCode(Tickets),
    });

    for (let i = 0; i < number.length; i++) {
      await TicketNumber.create({
        number: number[i],
        bet: bet[i],
        idTicket: ticket.dataValues.idTicket,
      });
    }

    await Cash.create({
      type: "INGRESO",
      quantity: totalTicket,
      state: "RESUELTO",
      idTicket: ticket.dataValues.idTicket,
      userId: userId,
      salesCommissionPercentage:
        (user.dataValues.salesCommissionPercentage / 100) * totalTicket,
      paymentMethod: paymentMethod,
    });

    let numbersUnique = [];

    const date = new Date(hrClient);

    // // Obtener el día
    // const day = date.toLocaleDateString("en-US", {
    //   day: "2-digit",
    //   month: "2-digit",
    //   year: "numeric",
    // });

    // // Obtener la hora y los minutos
    // const hour = date.toLocaleTimeString("en-US", {
    //   hour: "2-digit",
    //   minute: "2-digit",
    //   second: "2-digit",
    //   hour12: false,
    // });

    // // Send WhatsApp message
    // const to = clientInfo.phone;
    // const templateName = "comprobante3";
    // const languageCode = "es_AR";
    // const messageVariables = [
    //   {
    //     type: "text",
    //     text: day,
    //   },
    //   {
    //     type: "text",
    //     text: hour,
    //   },
    //   {
    //     type: "text",
    //     text: ticket.idTicket,
    //   },
    //   {
    //     type: "text",
    //     text: ticket.validationCode,
    //   },
    //   {
    //     type: "text",
    //     text: lottery,
    //   },
    //   {
    //     type: "text",
    //     text: hrLottery,
    //   },
    //   {
    //     type: "text",
    //     text: number[0] === 100 ? "00" : number[0].toString().padStart(2, "0"),
    //   },
    //   {
    //     type: "text",
    //     text: bet[0],
    //   },
    //   {
    //     type: "text",
    //     text: number[1] === 100 ? "00" : number[1].toString().padStart(2, "0"),
    //   },
    //   {
    //     type: "text",
    //     text: bet[1],
    //   },
    //   {
    //     type: "text",
    //     text: number[2] === 100 ? "00" : number[2].toString().padStart(2, "0"),
    //   },
    //   {
    //     type: "text",
    //     text: bet[2],
    //   },
    //   {
    //     type: "text",
    //     text: totalTicket,
    //   },
    // ];

    // await sendWhatsAppMessage(to, templateName, languageCode, messageVariables);
  }

  const data = "registros creados exitosamente";
  response(res, 200, data);
};
