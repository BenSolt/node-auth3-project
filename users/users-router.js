const router = require('express').Router();

const Users = require('./users-model');
const restricted = require('../auth/restricted-middleware');

router.get('/', restricted, onlyHouse('slytherin'), (req, res) => {
    Users.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  });

  //connected with whatever is on six after restricted.
  function onlyHouse(house) {
    return function(req, res, next) {
      if(req.user && req.user.house && req.user.house.toLowerCase() === house) {
       next();
      }else{
       res.status(403).json({spell: 'expelliarmus'})
      }
    }
   }
   
   module.exports = router;