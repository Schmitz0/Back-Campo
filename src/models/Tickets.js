const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Tickets",    {
      idTicket: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      validationCode: {
        type: DataTypes.STRING,
        unique: true, // Asegura que el código sea único
        allowNull: false,
      },
      total: {
        type:DataTypes.FLOAT,
        //
      },
      clientId:{
        type:DataTypes.INTEGER,
      },
      userId:{
        type:DataTypes.INTEGER,
      },
      state:{
        type:DataTypes.ENUM("Pagado", "Activo", "Anular", "Anulado", "Expirado", "Pendiente")
        //chron que mire a la noche los tickets que ya pasaron y actualice el campo.
      },
      stateAdmin:{
        type: DataTypes.STRING,
      },
      winningPrize:{
        type: DataTypes.INTEGER,
      },
      lotteryName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lotteryHr: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      paranoid: true,
    }
  );
};
