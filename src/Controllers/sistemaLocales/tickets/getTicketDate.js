const { Tickets, TicketNumber,Client } = require("../../../db.js");
const { response } = require("../../../utils");
const { Op } = require("sequelize");
const moment = require("moment");

const includeOptions = [
  {
    model: TicketNumber,
    attributes: ["bet", "number"],
  },
  {
    model: Client, // Agrega la relación con el modelo Client
    attributes: ["name", "surname"], // Selecciona los atributos que deseas incluir
  },
  
];

const getTotalQuantity = async (where) => {
  return await Tickets.sum("total", { where });
};

const getTotalTickets = async (where) => {
  return await Tickets.count({ where });
};

const getData = async (where) => {
  return await Tickets.findAll({
    include: includeOptions,
    where,
    order: [['createdAt', 'DESC']],
  });
};

module.exports = async (req, res) => {
  const userId = req.headers["userid"];
  const { formattedStartDate, formattedEndDate } = req.body;

  try {
    const startDate = moment(formattedStartDate).startOf("day").toDate();
    const endDate = moment(formattedEndDate).endOf("day").toDate();

    let where;

    if (userId == 1) {
      if (!formattedStartDate && !formattedEndDate) {
        where = {
          createdAt: {
            [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        };
      } else if (
        formattedStartDate &&
        formattedEndDate &&
        startDate.toDateString() === endDate.toDateString()
      ) {
        where = {
          createdAt: {
            [Op.and]: [
              { [Op.gte]: startDate },
              { [Op.lt]: new Date(endDate.setDate(endDate.getDate() + 1)) },
            ],
          },
        };
      } else {
        where = {
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        };
      }
    } else {
      if (!formattedStartDate && !formattedEndDate) {
        where = {
          createdAt: {
            [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
          },
          userId,
        };
      } else if (
        formattedStartDate &&
        formattedEndDate &&
        startDate.toDateString() === endDate.toDateString()
      ) {
        where = {
          createdAt: {
            [Op.and]: [
              { [Op.gte]: startDate },
              { [Op.lt]: new Date(endDate.setDate(endDate.getDate() + 1)) },
            ],
          },
          userId,
        };
      } else {
        where = {
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
          userId,
        };
      }
    }

    const data = await getData(where);
    const totalQuantity = await getTotalQuantity({ ...where, state: ["Pagado", "Activo", "Expirado", "Pendiente"] });
    const totalTickets = await getTotalTickets({ ...where, state: ["Pagado", "Activo", "Expirado", "Pendiente"] });

    return response(res, 200, {
      data,
      totalTickets,
      totalQuantity,
    });
  } catch (error) {
    console.error("Error:", error);
    response(res, 500, { error: "Internal Server Error" });
  }
};
