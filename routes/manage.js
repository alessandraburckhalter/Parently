const express = require('express');
const router = express.Router();
const db = require('../models')
const bcrypt = require('bcrypt')


//parent manage page
router.get('/', (req, res) => {
    res.render('parentDock', {
        locals: {
            error: null,
            kidId: req.query.kid
        }
    })
})

module.exports = router