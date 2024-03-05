const { CashAdmin, sequelize } = require('../../../db.js');
const { response } = require('../../../utils');

const allowedTypes = ['']


module.exports = async (req, res) => {
  const { id } = req.params;

  const movement = await CashAdmin.findByPk(id);

//   console.log(movement.dataValues.detail);
  
  if(movement.dataValues.detail === 'TRANSFERENCIA') return response(res, 200, 'Las transferencias no pueden ser borradas del registro')
  

  if(movement.dataValues.detail === 'DEPOSITO' || movement.dataValues.detail === 'RETIRO' ) movement.destroy()

  const data = {
    message: 'Movimiento borrado con éxito',
    movement,
  };

  response(res, 200, data);
};
