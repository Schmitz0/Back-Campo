const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Prize', {
    firstPrize: {
      type: DataTypes.INTEGER,
    },
    SecondPrize: {
      type: DataTypes.INTEGER,
    },
    ThirdPrize: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  });
};
