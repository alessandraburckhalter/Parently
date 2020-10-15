var express = require('express');
var router = express.Router();
const db = require('../models')

/* GET home page. */
router.get('/kids', function(req, res, next) {
  db.Parent.findByPk(req.session.user.id)
    .then((user) =>{
      return user.getChildren()

    })
    .then((children) => {
      res.json(children)
    })
});

// Get Parent Api
router.get('/parent', function(req,res) {
  db.Parent.findByPk(req.session.user.id)
    .then((user) => {
      res.json(user)
    })
} )

// Get chores
router.get('/child/:id/chores', function (req,res){
  db.Chore.findAll({
    where: {
      ChildId: req.params.id
    }
  })
    .then((chores) =>{
      res.json(chores)
    })
})
module.exports = router;
