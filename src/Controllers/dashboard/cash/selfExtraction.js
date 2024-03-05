const { Cash, CashAdmin, sequelize } = require('../../../db.js');
const { response } = require('../../../utils');

module.exports = async (req, res) => {
    const { quantity } = req.body;

        const extraction = await CashAdmin.create({
            type: 'EGRESO',
            quantity: -quantity,
            detail: 'RETIRO',
            state: 'RESUELTO',
        });

        const data = {
            message: 'Extracción realizada con éxito',
            extraction,
        };
        
        response(res, 200, data);
};

