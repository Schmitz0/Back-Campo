const { response } = require('../../../utils');
const { Numbers } = require('../../../db');
const { Op, Sequelize } = require("sequelize");

module.exports = async (req, res) => {
  try {
    const lastMonthNumbers1 = await Numbers.findAll({
      where: {
        createdAt: {
          [Op.gte]: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        },
      },
      attributes: [
        'number1',
        [Sequelize.literal('COUNT("number1")'), 'count1'],
      ],
      group: ['number1'],
      order: [[Sequelize.literal('count1 DESC')]],
      limit: 6,
    });

    const lastMonthNumbers2 = await Numbers.findAll({
      where: {
        createdAt: {
          [Op.gte]: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        },
      },
      attributes: [
        'number2',
        [Sequelize.literal('COUNT("number2")'), 'count2'],
      ],
      group: ['number2'],
      order: [[Sequelize.literal('count2 DESC')]],
      limit: 2,
    });


    const lastMonthNumbers3 = await Numbers.findAll({
      where: {
        createdAt: {
          [Op.gte]: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        },
      },
      attributes: [
        'number3',
        [Sequelize.literal('COUNT("number3")'), 'count3'],
      ],
      group: ['number3'],
      order: [[Sequelize.literal('count3 DESC')]],
      limit: 2,
    });



    response(res, 200, { lastMonthNumbers1,lastMonthNumbers2,lastMonthNumbers3});
  } catch (error) {
    console.error('Error:', error);
    response(res, 500, { error: 'Internal Server Error' });
  }
};
