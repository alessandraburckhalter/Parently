
var express = require('express');
var router = express.Router();
const db = require('../models');
const point = require('../models/point');
// Contains all of operations in Sequelize
const { Op } = db.Sequelize

/* GET home page. */
router.get('/kids', function (req, res, next) {
  db.Parent.findByPk(req.session.user.id)
    .then((user) => {
      return user.getChildren()

    })
    .then((children) => {
      res.json(children)
    })
});



// Get Parent Api
router.get('/parent', function (req, res) {
  db.Parent.findByPk(req.session.user.id)
    .then((user) => {
      res.json(user)
    })
})

// Get child
router.get('/child/:id', ((req, res) => {
  db.Child.findByPk(req.params.id)
    .then((child) => {
      res.json(child)
    })
}))

// Get chores for logged in child
router.get('/child/:id/chores', function (req, res) {
  //Check if chore is complete
  let startDate = new Date();
  startDate.setHours(0, 0, 0, 0)
  let endDate = new Date();
  endDate.setHours(23, 59, 59, 999)
  // Check db to check if chore has a point
  db.Chore.findAll({
    where: {
      ChildId: req.params.id
    },
    include: {
      model: db.Point,
      required: false,
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate]
        }
      }
    }
  })
  .then((chores) => {
    res.json(chores)
  })
  .catch((error) => {
    console.error(error);
      res.status(500).json({ error: 'A Database Error has Occurred' })
  })
})

//Get Points
router.get('/child/:id/point', (req,res) => {
  // Set var to set day
  const today = new Date()
  const day = today.getDay();
  // Set start Date hours to 0
  let startDate = new Date(today);
  startDate.setHours(0, 0, 0, 0)
  // set start Date date to always subtract 1
  startDate.setDate(startDate.getDate() - day + 1)

  // Set End date to always subtract 7. This is to make it start on Monday
  let endDate = new Date(today);
  endDate.setHours(23, 59, 59, 999)
  endDate.setDate(endDate.getDate()- day + 7)

  console.log(day)
  console.log(startDate.toString())
  console.log(endDate.toString())

  //Access db for Points
  db.Point.count({
    where: {
      ChildId: req.params.id,
      createdAt: {
        // Operation to search for points between the time periods
        [Op.between]: [startDate, endDate]
      }
    }
  })
  .then((count) => {
    res.json(count)
  })
  .catch((error) => {
    console.error(error);
      res.status(500).json({ error: 'A Database Error has Occurred' })
  })
})

//Get chores 
router.get('/child/chores', function (req, res) {
  db.Chore.findAll({
    where: {
      ChildId: req.session.child.id
    }
  })
    .then((chores) => {
      res.json(chores)
    })
    .catch((error) => {
      console.error(error);
        res.status(500).json({ error: 'A Database Error has Occurred' })
    })
})

// Edit Chore
router.put('/chore/:id', (req, res) => {

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
      res.status(500).json({ error: 'A Database Error has Occurred' })
    })
})

//Delete Chore
router.delete('/chore/:id', (req, res) => {
  db.Chore.destroy({
    where: {
      id: req.params.id
    }
  })


    .then((response) => {
      res.json()
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'A Database Error has Occurred' })
    })
})


//Create Api to send Points to
router.post('/chore/:id/point', (req, res) => {
  let startDate = new Date();
  startDate.setHours(0, 0, 0, 0)
  
  let endDate = new Date();
  endDate.setHours(23, 59, 59, 999)

  //Create a point linked to child and chore
  db.Chore.findByPk(req.params.id)
    .then((chore) => {
      return chore.getPoints({
        where: {
          createdAt: {
            [Op.between]: [startDate, endDate]
          }
        }
      })
    })
    .then((points) => {
      if (points.length) {
        res.status(201).json()
      } else {
        const { number } = req.body
        // If there are no points in between the set dates where chores have already been compeleted
        // Then create a new point
        db.Point.create({
          number: 1,
          ChoreId: req.params.id,
          ChildId: req.session.child.id
        })
          .then((result) => {
            res.status(201).json()
          })
          .catch((error) => {
            console.error(error);
              res.status(500).json({ error: 'A Database Error has Occurred' })
          })
      }
    })
})


module.exports = router;
