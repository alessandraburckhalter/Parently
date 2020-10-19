const express = require('express');
const router = express.Router();
const db = require('../models')
const bcrypt = require('bcrypt')


//overview page
router.get('/', (req, res) => {
    res.render('pick-child', {
        locals: {
            error: null
        }
    })
})


module.exports = router