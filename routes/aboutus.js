const express = require('express');
const router = express.Router();
const db = require('../models')
const bcrypt = require('bcrypt')


router.get('/', (req, res) => {
    res.render('about-us', {
        locals: {
            error: null
        }
    })
})


module.exports = router