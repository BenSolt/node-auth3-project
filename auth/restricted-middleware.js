const jwt = require('jsonwebtoken')
const {jwtSecret} = require('../config/sercrets')

module.exports = (req, res, next) => {
  //const { username, password } = req.headers;
const token = req.headers.authorization;

if(token){
  jwt.verify(token, jwtSecret, (err, decodedToken) => {
    if(err) {
//token is not valid
      res.status(401).json({message:"you cant get this, not valid token"})
    }else{
      req.user = decodedToken.user;

      next();
    }
  })
}else{
  res.status(401).json({message: ' you shall not pass'})
 }
};