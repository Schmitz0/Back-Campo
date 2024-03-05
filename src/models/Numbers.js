const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Numbers",
    {
      number1: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      number2: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      number3: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      hr: {
        type: DataTypes.STRING,
        //allowNull: false,
      },
      page: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nameLottery: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageUrl:{
        type:DataTypes.STRING,
      },
      day:{
        type:DataTypes.DATE,
      }
    },
  );
};
