const { Cash, Tickets, sequelize } = require("../../../db.js");
const { response } = require("../../../utils");
const { Op } = require("sequelize");
const moment = require("moment");

const includeOptions = {
  model: Tickets,
  attributes: { exclude: ["createdAt", "updatedAt"] },
};

module.exports = async (req, res) => {
  const { formattedStartDate, formattedEndDate } = req.body;
  const userId = req.headers["userid"];
  let cash = [];

  try {
    if (userId == 1) {
      if (formattedStartDate && formattedEndDate) {
        const startDate = moment(formattedStartDate).startOf("day").toDate();
        const endDate = moment(formattedEndDate).endOf("day").toDate();

        const totalQuantity = await Cash.sum("quantity", {
          where: {
            createdAt: {
              [Op.between]: [startDate, endDate],
            },
          },
        });

        if (
          formattedStartDate &&
          formattedEndDate &&
          startDate.toDateString() === endDate.toDateString()
        ) {
          cash = await Cash.findAll({
            include: includeOptions,
            where: {
              createdAt: {
                [Op.and]: [
                  { [Op.gte]: startDate },
                  { [Op.lt]: new Date(endDate.setDate(endDate.getDate() + 1)) },
                ],
              },
            },
            order: [["createdAt", "DESC"]],
          });
        } else {
          cash = await Cash.findAll({
            include: includeOptions,
            where: {
              createdAt: {
                [Op.between]: [startDate, endDate],
              },
            },
            order: [["createdAt", "DESC"]],
          });
        }

        response(res, 200, {
          cash,
          totalQuantity,
        });
      }
    } else {
      if (formattedStartDate && formattedEndDate) {
        const startDate = moment(formattedStartDate).startOf("day").toDate();
        const endDate = moment(formattedEndDate).endOf("day").toDate();

        const totalQuantity = await Cash.sum("quantity", {
          where: {
            createdAt: {
              [Op.between]: [startDate, endDate],
            },
            userId,
          },
        });

        if (
          formattedStartDate &&
          formattedEndDate &&
          startDate.toDateString() === endDate.toDateString()
        ) {
          cash = await Cash.findAll({
            include: includeOptions,
            where: {
              createdAt: {
                [Op.and]: [
                  { [Op.gte]: startDate },
                  { [Op.lt]: new Date(endDate.setDate(endDate.getDate() + 1)) },
                ],
              },
              userId,
            },
            order: [["createdAt", "DESC"]],
          });
        } else {
          cash = await Cash.findAll({
            include: includeOptions,
            where: {
              createdAt: {
                [Op.between]: [startDate, endDate],
              },
              userId,
            },
            order: [["createdAt", "DESC"]],
          });
        }

        response(res, 200, {
          cash,
          totalQuantity,
        });
      }
    }
  } catch (error) {
    console.error("Error:", error);
    response(res, 500, { error: "Internal Server Error" });
  }
};
