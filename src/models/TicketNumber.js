const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "TicketNumber",
    {
      number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bet: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      paranoid: true,
    }
  );
};
