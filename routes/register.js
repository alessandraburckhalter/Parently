const express = require('express');
const router = express.Router();
const db = require('../models')

/* GET users listing. */
router.get('/',(req,res) => {
  res.render('register',{
    locals: {
      error: null,
    }
  })
})
//Practice Post Register Route
router.post('/',(req,res) => {
  if(!req.body.email || !req.body.password){
    res.render('register', {
      locals: {
        error: 'Please complete all fields'
      }
    })
    console.log('Nope')
    return;
  }
  
  const { email, password, first_name, last_name } = req.body
  
    db.Parent.create({
      first_name: first_name,
      last_name: last_name,
      email:email,
      password: password
    })
    .then((result) => {
        res.redirect('/')
      })
  



  
})

module.exports = router;
