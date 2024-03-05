const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "LotteryName",
    {
      lottery: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
      },
    },
    {
      paranoid: true,
    }
  );
};
