const express = require('express');
const router = express.Router();
const db = require('../models')
const bcrypt = require('bcrypt')



//logout
router.get('/', (req,res) => {
    req.session.user = null
    res.redirect('/login') 
  })

  module.exports = router