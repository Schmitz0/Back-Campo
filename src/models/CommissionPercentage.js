const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('CommissionPercentage', {
    salesCommissionPercentage: {
      type: DataTypes.INTEGER,
    },
    paymentCommissionPercentage: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  });
};
