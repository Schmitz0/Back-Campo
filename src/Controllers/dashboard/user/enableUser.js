const { User } = require('../../../db');
const response = require('../../../utils/response');
const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  const { id } = req.params;
  const { enable } = req.body;

  const user = await User.findByPk(id);

  await user.update({ enable });

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'norwichandcompany@gmail.com',
        //norwichandcompany@gmail.com

        //saji essp vdkf tzae
        pass: 'sajiesspvdkftzae' // esto iria en .env
    }
});

// pass del mail: nodemailer

const msg = {
from: '"Eric Guerrero" <erick-guerrero@outlook.com.pe>', // sender address
to: `${user.email}`,
subject: "Tu usuario no esta habilitado para operar!", // Subject line
text: "Hello world?", // plain text body
html: `<b>Comunicate con la central!</b>`, // html body
}

const info = await transporter.sendMail(msg);

console.log("Message sent: %s", info.messageId);
// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  response(res, 200, user);
};