const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define(
    'Client',
    {
    clientId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
          },
      name: {
        type: DataTypes.STRING,
      },
      surname: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
        unique: true,
      },
      genre: {
        type: DataTypes.ENUM("F","M"),
      },
      birthDate: {
        type: DataTypes.DATEONLY,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
  );
};
