const { User } = require('../../../db');
const bcrypt = require('bcrypt');
const response = require('../../../utils/response');
const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  const {
    name,
    email,
    password,
    role,
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
    interbancario1,
    bankAccount2,
    interbancario2,
    address,
    urbanization,
    district,
    province,
    department,
    salesCommissionPercentage,
    paymentCommissionPercentage,
    firstPrize,
    SecondPrize,
    ThirdPrize,
  } = req.body;

  const hashPassword = await bcrypt.hash(password, 8);

  const lowerCaseEmail = email.toLowerCase(); // Convertir el email a minúsculas

  const user = await User.create({
    name,
    email: lowerCaseEmail, // Usar el email en minúsculas
    hashPassword,
    role,
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
    interbancario1,
    bankAccount2,
    interbancario2,
    address,
    urbanization,
    district,
    province,
    department,
    salesCommissionPercentage,
    paymentCommissionPercentage,
    firstPrize,
    SecondPrize,
    ThirdPrize,
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

    // const pdfFilePath = 'C:/Users/schmi/Documents/Proyecto Erick Guerrero/Erick-Guerrero-Back/src/Controllers/dashboard/user/prueba.pdf';
    const pdfFilePath = '';
    
const msg = {
  from: '"Erick Guerrero" <erick-guerrero@outlook.com.pe>', // sender address
  to: `${email}`,
  subject: "Bienvenido a Fortune Numbers", // Subject line
  text: "Hello world?", // plain text body
  html: `<b>Con este mail: ${email} tendras acceso a la plataforma!</b><p>no olvides tu password, y cambiala pronto ${password}</p>`, // html body
  attachments: [
    {
      filename: 'prueba.pdf',
      path: pdfFilePath
    }
  ]
}

  const info = await transporter.sendMail(msg);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  response(res, 200, user);
};
