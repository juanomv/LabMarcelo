
const jwtconfig = require('../config/jwt.config')
const jwt = require('jsonwebtoken')


function verificarToken(req, res, next) {
  try {
    if (!req.headers.authorization) {
      res.status(200).json({ auth: false , msg:"No tiene un token"});
    } else {
      let token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, jwtconfig.secret, async (err, decode) => {
        if (err) {
          res.status(200).json({ auth: false, code:'CAD01', msg: "token invalido" });
        } else {
          req.headers.dato = decode;
          next();
        }
      });
    }
  } catch (error) {
    res.status(500).json({ auth: false ,msg: "error en el servidor",
    error,});
  }
}
module.exports={verificarToken}