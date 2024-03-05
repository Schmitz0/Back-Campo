const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('CashAdmin', {
    type: {
      type: DataTypes.ENUM('INGRESO', 'EGRESO'),
    },
    quantity: {
      type: DataTypes.FLOAT,
    },
    detail: {
      type: DataTypes.ENUM('RETIRO', 'TRANSFERENCIA','DEPOSITO'),
    },
    state: {
      type: DataTypes.ENUM('PENDIENTE', 'RESUELTO'),
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    cashIdMovement: {
        type: DataTypes.INTEGER,
      },
  });
};
