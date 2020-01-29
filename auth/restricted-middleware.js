const jwt = require('jsonwebtoken')
const {jwtSecret} = require('../config/secrets')

module.exports = (req, res, next) => {
  //const { username, password } = req.headers;
const token = req.headers.authorization;

if(token){
  jwt.verify(token, jwtSecret, (err, decodedToken) => {
    if(err) {
//
      res.status(401).json({message:"you cant get this"})
    }else{
      req.user = decodedToken.user;

      next();
    }
  })
}else{
  res.status(401).json({message: ' you shall not pass'})
 }
};