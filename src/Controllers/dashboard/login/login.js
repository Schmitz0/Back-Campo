const bcrypt = require('bcrypt');
const { User } = require('../../../db');
const { generateToken, response } = require('../../../utils/index.js');

module.exports = async (req, res) => {
  const { email, password } = req.body;

  const lowerCaseEmail = email.toLowerCase(); // Convertir el email a minúsculas

  const user = await User.findOne({ where: { email: lowerCaseEmail } });
  // console.log('jhoa.a');
  // console.log(user.enable);
  
  if (!user.enable) return response(res, 400, { message: 'Usuario inhabilitado' });

  if (user) {
    if (bcrypt.compareSync(password, user.hashPassword)) {
      const data = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user),
      };
      response(res, 200, data);
    } else {
      response(res, 401, { message: 'invalid email or password' });
    }
  }
};