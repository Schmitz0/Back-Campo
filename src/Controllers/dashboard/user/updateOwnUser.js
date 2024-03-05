const { User } = require('../../../db');
const bcrypt = require('bcrypt');
const response = require('../../../utils/response');
const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  const userId = req.headers['userid'];
  // const { id } = req.params;
  let lowerCaseEmail = ''

  const {
    name,
    email,
    password,
    dni,
    businessName,
    ownerPhone,
    contactName,
    contactEmail,
    contactPhone,
    contactDni,
    phoneYAPE,
    phonePLIN,
    bankAccount1,
    bankAccount2,
    interbancario1,
    interbancario2,
    address,
    urbanization,
    district,
    province,
    department,
  } = req.body;

  if(email) lowerCaseEmail = email.toLowerCase();
  
  const user = await User.findByPk(userId);

  let hashPassword;

  if (password) {
    hashPassword = await bcrypt.hash(password, 8);
  } else {
    hashPassword = user.hashPassword;
  }

  await user.update({
    name,
    // email, // Usar el email en minúsculas
    email: lowerCaseEmail ? lowerCaseEmail: email, // Usar el email en minúsculas
    hashPassword,
    dni,
    businessName,
    ownerPhone,
    contactName,
    contactEmail,
    contactPhone,
    contactDni,
    phoneYAPE,
    phonePLIN,
    bankAccount1,
    bankAccount2,
    interbancario1,
    interbancario2,
    address,
    urbanization,
    district,
    province,
    department,
  });


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
from: '"Erick Guerrero" <erick-guerrero@outlook.com.pe>', // sender address
to: "norwichandcompany@gmail.com",
subject: "Cambios en Usuario", // Subject line
text: "Hello world?", // plain text body
html: `<b>El usuario de id: ${id}, email: ${email} realizo cambios en sus datos personales!</b>`, // html body
}

const info = await transporter.sendMail(msg);

console.log("Message sent: %s", info.messageId);
// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  response(res, 200, user);
};
