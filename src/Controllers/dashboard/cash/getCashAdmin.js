const { CashAdmin, sequelize } = require('../../../db.js');
const { response } = require('../../../utils');
const { Op } = require('sequelize');

module.exports = async (req, res) => { 
  let cash = [];

    // Get total quantity for the day, week, and month
    const todayTotalQuantityIn = await CashAdmin.sum('quantity', {
      where: {
        createdAt: {
          [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
        },
        type: 'INGRESO'
      },
    });

    const lastWeekTotalQuantityIn = await CashAdmin.sum('quantity', {
      where: {
        createdAt: {
          [Op.gte]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
        },
        type: 'INGRESO',
      },
    });

    const lastMonthTotalQuantityIn = await CashAdmin.sum('quantity', {
      where: {
        createdAt: {
          [Op.gte]: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        },
        type: 'INGRESO',
      },
    });


    const todayTotalQuantityOut = await CashAdmin.sum('quantity', {
      where: {
        createdAt: {
          [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
        },
        type: 'EGRESO'
      },
    });

    const lastWeekTotalQuantityOut = await CashAdmin.sum('quantity', {
      where: {
        createdAt: {
          [Op.gte]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
        },
        type: 'EGRESO',
      },
    });

    const lastMonthTotalQuantityOut = await CashAdmin.sum('quantity', {
      where: {
        createdAt: {
          [Op.gte]: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        },
        type: 'EGRESO',
      },
    });

    const todayTotal = todayTotalQuantityIn + todayTotalQuantityOut;
    const weekTotal = lastWeekTotalQuantityIn + lastWeekTotalQuantityOut;
    const monthTotal = lastMonthTotalQuantityIn + lastMonthTotalQuantityOut;


    const today = new Date();
    today.setHours(0, 0, 0, 0); // Establecer la hora a 00:00:00:000 del día de hoy

    const balance = await CashAdmin.sum("quantity", {
      where: {
        createdAt: {
          [Op.lt]: today,
        },
      },
    });

    cash = await CashAdmin.findAll({
      where: {
        createdAt: {
          [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
      order: [['createdAt', 'DESC']],
    });

    response(res, 200, {
      cash,
      balance,
      todayTotal,
      weekTotal,
      monthTotal,
      todayTotalQuantityIn,
      lastWeekTotalQuantityIn,
      lastMonthTotalQuantityIn,
      todayTotalQuantityOut,
      lastWeekTotalQuantityOut,
      lastMonthTotalQuantityOut,
    });
  }
