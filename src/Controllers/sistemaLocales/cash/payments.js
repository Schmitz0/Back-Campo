const { Cash, CashAdmin ,sequelize} = require('../../../db.js');
const { response } = require('../../../utils');

module.exports = async (req, res) => {
    const userId = req.headers['userid'];
    const { quantity } = req.body;

    try {
        // Crear el pago de salida
        const paymentOut = await Cash.create({
            type: 'EGRESO',
            quantity: -quantity,
            detail: 'TRANSFERENCIA',
            state: 'PENDIENTE',
            userId,
        });

        // Crear el pago de entrada asociado
        const paymentIn = await CashAdmin.create({
            type: 'INGRESO',
            quantity,
            detail: 'TRANSFERENCIA',
            state: 'PENDIENTE',
            userId,
            cashIdMovement: paymentOut.id,
        });

        // Enviar los detalles de los pagos como parte de la respuesta
        const data = {
            message: 'Transferencia creada con éxito',
            paymentOut,
            paymentIn,
        };

        response(res, 200, data);
    } catch (error) {
        // En caso de error, realizar rollback y enviar mensaje de error
        

        const data = 'Hubo un error al crear la transferencia';
        response(res, 500, data);
    }
};

      


