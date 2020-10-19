var express = require('express');
const { response } = require('../app');
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
// Get child
router.get('/child/:id',((req,res) =>{
  db.Child.findByPk(req.params.id)
  .then((child) => {
    res.json(child)
  })
}))

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

//Get chores for Logged in Child
router.get('/child/chores', function (req,res) {
  db.Chore.findAll({
    where:{
      ChildId: req.session.child.id
    }
  })
    .then((chores)=> {
      res.json(chores)
    })
})

router.put('/chore/:id', (req,res) => {
  
  console.log(req.body)
    db.Chore.findByPk(req.params.id)
      .then((result) => {
          result.name = req.body.name
          result.complete = req.body.complete
          result.mon = req.body.mon
          result.tue = req.body.tue
          result.wed = req.body.wed
          result.thu = req.body.thu
          result.fri = req.body.fri
          result.sat = req.body.sat
          result.sun = req.body.sun
          return result.save();
          
      })
      .then((response) => {
        res.json()
      })
      
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'A Database Error has Occurred'})
      })
})

module.exports = router;
