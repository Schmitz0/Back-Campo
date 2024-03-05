const { response } = require('../../../utils');
const { Client } = require('../../../db');
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  const { id } = req.params;
  const { phone } = req.query
  console.log(phone);
  let clients = [];

  if(phone) clients = await Client.findAll({
    where:{
      phone: {
        [Op.substring]: phone
      }
    }
  });

  if (!id && !phone) clients = await Client.findAll();

  if (id) clients = await Client.findByPk(id);
  
  response(res, 200, clients);
};
