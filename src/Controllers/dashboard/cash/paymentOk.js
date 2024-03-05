const { Cash, CashAdmin } = require('../../../db.js');
const { response } = require('../../../utils/index.js');

module.exports = async (req, res) => {
    const { id } = req.body; // id del mov del cash

    try {
        // Buscar el registro de CashAdmin por su ID
        const payment = await CashAdmin.findByPk(id);

        // Verificar si el registro existe
        if (!payment) {
            const data = 'No se encontró el pago';
            return response(res, 404, data);
        }

        // Actualizar el estado del registro CashAdmin
        await payment.update({
            state: 'RESUELTO',
        });

        // Obtener el ID de la transferencia asociada
        const paymentId = payment.cashIdMovement;

        // Buscar el registro de Cash asociado
        const paymentOk = await Cash.findByPk(paymentId);

        // Verificar si el registro existe
        if (!paymentOk) {
            const data = 'No se encontró la transferencia asociada';
            return response(res, 404, data);
        }

        // Actualizar el estado del registro Cash
        await paymentOk.update({
            state: 'RESUELTO',
        });

        const data = 'Pago Confirmado';
        response(res, 200, data);
    } catch (error) {

        const data = 'Hubo un error al confirmar el pago';
        response(res, 500, data);
    }
};

