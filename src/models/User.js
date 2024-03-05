const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      businessName: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
      ownerPhone: {
        type: DataTypes.STRING, 
      },
      email: {
        type: DataTypes.STRING,
        // allowNull: false,
        // unique: true,
      },
      // Poner información del dueño, obligatoria, y del encargado de forma alternativa. Nombres, Apellidos, Correo, Teléfono, Documento.
      hashPassword: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'User', 
      },
      dni: {
        type: DataTypes.STRING, 
        allowNull: true, 
      },
      contactName: {
        type: DataTypes.STRING,
      },
      contactEmail: {
        type: DataTypes.STRING,
      },
      contactPhone: {
        type: DataTypes.STRING, 
      },
      contactDni: {
        type: DataTypes.STRING, 
      },
      phoneYAPE: {
        type: DataTypes.STRING, 
        allowNull: true,
      },
      phonePLIN: {
        type: DataTypes.STRING, 
        allowNull: true,
      },
      bankAccount1: {
        type: DataTypes.STRING, 
        allowNull: true, 
      },
      interbancario1: {
        type: DataTypes.STRING, 
        allowNull: true, 
      },
      bankAccount2: {
        type: DataTypes.STRING, 
        allowNull: true, 
      },
      interbancario2: {
        type: DataTypes.STRING, 
        allowNull: true, 
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true, 
      },
      urbanization: {
        type: DataTypes.STRING,
        allowNull: true, 
      },
      district: {
        type: DataTypes.STRING,
        allowNull: true, 
      },
      province: {
        type: DataTypes.STRING,
        allowNull: true, 
      },
      department: {
        type: DataTypes.STRING,
        allowNull: true, 
      },
      enable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      salesCommissionPercentage: {
        type: DataTypes.INTEGER,
      },
      paymentCommissionPercentage: {
        type: DataTypes.INTEGER,
      },
      firstPrize: {
        type: DataTypes.INTEGER,
      },
      SecondPrize: {
        type: DataTypes.INTEGER,
      },
      ThirdPrize: {
        type: DataTypes.INTEGER,
      },
    },
    {
      paranoid: true,
    }
  );
};



// Necesitamos crear notificaciones (correo) para los usuarios al momento de darse de alta, de baja. y actualizacion de datos de usuarios ya creados