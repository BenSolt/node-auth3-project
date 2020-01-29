const router = require('express').Router();

const Users = require('./users-model');
const restricted = require('../auth/restricted-middleware');

router.get('/', restricted, whatdepartment('too'), (req, res) => {
    Users.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  });

  //connected with whatever is on six - onlyHouse 
  function whatdepartment(department) {
    return function(req, res, next) {
        console.log('user', req.user)
      if(req.user && req.user.department && req.user.department.toLowerCase() === department) {
       next();
      }else{
       res.status(403).json({spell: 'speek friend and enter'})
      }
    }
   }
   
   module.exports = router;