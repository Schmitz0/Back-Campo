const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Cash', {
    type: {
      type: DataTypes.ENUM('INGRESO', 'EGRESO'),
    },
    quantity: {
      type: DataTypes.FLOAT,
    },
    detail: {
      type: DataTypes.ENUM('RETIRO', 'TRANSFERENCIA','PAGO DE TICKET'),
    },
    state: {
      type: DataTypes.ENUM('PENDIENTE', 'RESUELTO','ANULADO'),
    },
    paymentMethod: {
      type: DataTypes.ENUM('EFECTIVO', 'OTROS'),
    },
    salesCommissionPercentage: {
      type: DataTypes.FLOAT,
    },
    paymentCommissionPercentage: {
      type: DataTypes.FLOAT,
    },
    firstPrize: {
      type: DataTypes.FLOAT,
    },
    SecondPrize: {
      type: DataTypes.FLOAT,
    },
    ThirdPrize: {
      type: DataTypes.FLOAT,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idTicket: {
      type: DataTypes.INTEGER,
    },
  });
};
