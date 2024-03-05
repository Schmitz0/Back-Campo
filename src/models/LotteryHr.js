const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "LotteryHr",
    {
      hr: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
      },
    },
    {
      paranoid: true,
    }
  );
};
