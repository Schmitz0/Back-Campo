const { Cash, Tickets, sequelize } = require('../../../db.js');
const { response } = require('../../../utils');
const { Op } = require('sequelize');

const includeOptions = {
  model: Tickets,
  attributes: { exclude: ['createdAt', 'updatedAt'] },
};

module.exports = async (req, res) => {
  const userId = req.headers['userid'];
  let cash = [];

  try {
    if (userId == 1) {
      // Get total quantity for the day, week, and month
      const todayTotalQuantity = await Cash.sum('quantity', {
        where: {
          createdAt: {
            [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
          },
          type:"INGRESO",
          [Op.or]: [
            { state: { [Op.ne]: 'ANULADO' } }, // excluye los registros con estado ANULADO
            { state: null }, ],
        detail: null,
      
        },
      });

      const lastWeekTotalQuantity = await Cash.sum('quantity', {
        where: {
          createdAt: {
            [Op.gte]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
          },
          type:"INGRESO",
        detail: null,
      
        },
      });

      const lastMonthTotalQuantity = await Cash.sum('quantity', {
        where: {
          createdAt: {
            [Op.gte]: new Date(new Date().setMonth(new Date().getMonth() - 1)),
          },
          type:"INGRESO",
        detail: null,
        },
      });

      cash = await Cash.findAll({
        where: {
          createdAt: {
            [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
        include: includeOptions,
        order: [['createdAt', 'DESC']],
      });

      const todayTotalSalesCommission = await Cash.sum(
        'salesCommissionPercentage',
        {
          where: {
            createdAt: {
              [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
            },
            [Op.or]: [
              { state: { [Op.ne]: 'ANULADO' } }, // excluye los registros con estado ANULADO
              { state: null }, ],
          },
        }
      );

      const lastWeekTotalSalesCommission = await Cash.sum(
        'salesCommissionPercentage',
        {
          where: {
            createdAt: {
              [Op.gte]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
            },
          },
        }
      );

      const lastMonthTotalSalesCommission = await Cash.sum(
        'salesCommissionPercentage',
        {
          where: {
            createdAt: {
              [Op.gte]: new Date(new Date().setMonth(new Date().getMonth() - 1)),
            },
          },
        }
      );
  
      const todayTotalPaymentCommission = await Cash.sum(
        'paymentCommissionPercentage',
        {
          where: {
            createdAt: {
              [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
            },
            [Op.or]: [
              { state: { [Op.ne]: 'ANULADO' } }, // excluye los registros con estado ANULADO
              { state: null }, ],
          },
        }
      );


      const lastWeekTotalPaymentCommission = await Cash.sum(
        'paymentCommissionPercentage',
        {
          where: {
            createdAt: {
              [Op.gte]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
            },
          },
        }
      );

      const lastMonthTotalPaymentCommission = await Cash.sum(
        'paymentCommissionPercentage',
        {
          where: {
            createdAt: {
              [Op.gte]: new Date(new Date().setMonth(new Date().getMonth() - 1)),
            },
          },
        }
      );

      return response(res, 200, {
        cash,
        todayTotalQuantity,
        lastWeekTotalQuantity,
        lastMonthTotalQuantity,
        todayTotalSalesCommission,
        lastWeekTotalSalesCommission,
        lastMonthTotalSalesCommission,
        todayTotalPaymentCommission,
        lastWeekTotalPaymentCommission,
        lastMonthTotalPaymentCommission,
      });
    } else {
    // Get total quantity for the day, week, and month
    const todayTotalQuantityIn = await Cash.sum('quantity', {
      where: {
        createdAt: {
          [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
        },
        userId,
        type:'INGRESO',
        [Op.or]: [
          { state: { [Op.ne]: 'ANULADO' } }, // excluye los registros con estado ANULADO
          { state: null }, ],
        detail: null,
      },
    });

    const todayTotalQuantityOutT = await Cash.sum('quantity', {
      where: {
        createdAt: {
          [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
        },
        userId,
        detail:"TRANSFERENCIA"
      },
    });

    const todayTotalQuantityOutP = await Cash.sum('quantity', {
      where: {
        createdAt: {
          [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
        },
        userId,
        type:'EGRESO',
        detail:"PAGO DE TICKET"
      },
    });

    const todayTotalSalesCommission = await Cash.sum(
      'salesCommissionPercentage',
      {
        where: {
          createdAt: {
            [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
          },
          [Op.or]: [
            { state: { [Op.ne]: 'ANULADO' } }, // excluye los registros con estado ANULADO
            { state: null }, ],
          userId,
        },
      }
    );

    const lastWeekTotalSalesCommission = await Cash.sum(
      'salesCommissionPercentage',
      {
        where: {
          createdAt: {
            [Op.gte]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
          },
          userId,
        },
      }
    );

    const lastMonthTotalSalesCommission = await Cash.sum(
      'salesCommissionPercentage',
      {
        where: {
          createdAt: {
            [Op.gte]: new Date(new Date().setMonth(new Date().getMonth() - 1)),
          },
          userId,
        },
      }
    );

    const todayTotalPaymentCommission = await Cash.sum(
      'paymentCommissionPercentage',
      {
        where: {
          createdAt: {
            [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
          },
          [Op.or]: [
            { state: { [Op.ne]: 'ANULADO' } }, // excluye los registros con estado ANULADO
            { state: null }, ],
          userId,
        },
      }
    );


    const lastWeekTotalPaymentCommission = await Cash.sum(
      'paymentCommissionPercentage',
      {
        where: {
          createdAt: {
            [Op.gte]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
          },
          userId,
        },
      }
    );

    const lastMonthTotalPaymentCommission = await Cash.sum(
      'paymentCommissionPercentage',
      {
        where: {
          createdAt: {
            [Op.gte]: new Date(new Date().setMonth(new Date().getMonth() - 1)),
          },
          userId,
        },
      }
    );

    const todayTotalQuantityCash = await Cash.sum('quantity', {
      where: {
        createdAt: {
          [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
        },
        userId,
        [Op.or]: [
          { state: { [Op.ne]: 'ANULADO' } }, // excluye los registros con estado ANULADO
          { state: null }, ],
        paymentMethod: 'EFECTIVO',
      },
    });

    const todayTotalQuantityOthers = await Cash.sum('quantity', {
      where: {
        createdAt: {
          [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
        },
        userId,
        [Op.or]: [
          { state: { [Op.ne]: 'ANULADO' } }, // excluye los registros con estado ANULADO
          { state: null }, ],
        paymentMethod: 'OTROS',
      },
    });

    const todayTotalQuantity = await Cash.sum('quantity', {
      where: {
        createdAt: {
          [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
        },
        type:"INGRESO",
      detail: null,
      userId,
      },
    });

    const lastWeekTotalQuantity = await Cash.sum('quantity', {
      where: {
        createdAt: {
          [Op.gte]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
        },
        detail:null,
        type:'INGRESO',
        userId,
      },
    });

    const lastMonthTotalQuantity = await Cash.sum('quantity', {
      where: {
        createdAt: {
          [Op.gte]: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        },
        detail:null,
        type:'INGRESO',
        userId,
      },
    });


    const today = new Date();
    today.setHours(0, 0, 0, 0); // Establecer la hora a 00:00:00:000 del día de hoy

    const balance = await Cash.sum("quantity", {
      where: {
        createdAt: {
          [Op.lt]: today,
        },
        userId,
      },
    });

    cash = await Cash.findAll({
      where: {
        userId,
        createdAt: {
          [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
      include: includeOptions,
      order: [['createdAt', 'DESC']],
    });

    response(res, 200, {
      cash,
      balance,
      todayTotalQuantityIn,
      todayTotalQuantityOutT,
      todayTotalQuantityOutP,
      todayTotalSalesCommission,
      lastWeekTotalSalesCommission,
      lastMonthTotalSalesCommission,
      todayTotalPaymentCommission,
      lastWeekTotalPaymentCommission,
      lastMonthTotalPaymentCommission,
      todayTotalQuantityCash,
      todayTotalQuantityOthers,
      todayTotalQuantity,
      lastWeekTotalQuantity,
      lastMonthTotalQuantity,
      
    });
  }
  } catch (error) {
    console.error('Error:', error);
    response(res, 500, { error: 'Internal Server Error' });
  }
};
