const express = require('express');
const router = express.Router();
const db = require('../models')
const bcrypt = require('bcrypt')


function checkAuth(req, res, next) {
    if (req.session.user){
        next();
    }else{
        res.redirect('/login')
    }
}

//overview page
router.get('/',checkAuth, (req, res) => {
    res.render('pick-child', {
        locals: {
            error: null
        }
    })
})


module.exports = router