const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authorization = req.get('authorization');
  let token = null;
  
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      token = authorization.substring(7);
    }
    
    const decodedToken = jwt.verify(token, process.env.SECRET || "algosecreto");
    console.log('aca'+ decodedToken.id );
    
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'Token invalido o faltante' });
  }

//   const { id } = decodedToken;
//   const { role } = decodedToken;
//   const { name } = decodedToken;
//   const { email } = decodedToken;

//   req.body.id = id;
//   req.body.role = role;
//   req.body.name = name;
//   req.body.email = email;

  next();
};
