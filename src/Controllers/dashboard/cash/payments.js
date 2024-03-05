const { Cash, CashAdmin, sequelize } = require('../../../db.js');
const { response } = require('../../../utils');

module.exports = async (req, res) => {
    const userId = req.headers['userid'];
    const { quantity, id } = req.body;

    try {
        const paymentIn = await Cash.create({
            type: 'INGRESO',
            quantity,
            detail: 'TRANSFERENCIA',
            state: 'RESUELTO',
            userId:id,
        },);

        const paymentOut = await CashAdmin.create({
            type: 'EGRESO',
            quantity: -quantity,
            detail: 'TRANSFERENCIA',
            state: 'RESUELTO',
            userId,
            cashIdMovement: paymentIn.id,
        },);

        const data = {
            message: 'Transferencia realizada con éxito',
            paymentIn,
            paymentOut,
        };

        response(res, 200, data);
    } catch (error) {

        console.error(error);
        const data = 'Hubo un error al realizar la transferencia';
        response(res, 500, data);
    }
};

