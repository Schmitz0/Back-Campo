const { Cash, CashAdmin, sequelize } = require('../../../db.js');
const { response } = require('../../../utils');

module.exports = async (req, res) => {
    const { quantity } = req.body;

        const deposit = await CashAdmin.create({
            type: 'INGRESO',
            quantity,
            detail: 'DEPOSITO',
            state: 'RESUELTO',
        });

        const data = {
            message: 'Deposito realizado con éxito',
            deposit,
        };

        response(res, 200, data);

};

