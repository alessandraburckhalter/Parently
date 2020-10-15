const express = require('express');
const router = express.Router();
const db = require('../models')
const bcrypt = require('bcrypt')





router.get('/', (req, res) => {
    res.render('child-sign-up', {
        locals: {
            error: null
        }
    })
})
//register kids
router.post('/', (req, res) => {
    if (!req.body.first_name || !req.body.password) {
        res.render('kids', {
            locals: {
                error: 'Please complete all fields'
            }
        })
        console.log('Nope')
        return;
    }


    const { user_name, first_name, last_name, password } = req.body
    bcrypt.hash(password, 10, (err, hash) => {

        db.Child.create({
            first_name: first_name,
            last_name: last_name,
            user_name: user_name,
            password: hash,
            ParentId: req.session.user.id

        })
            .then((result) => {
                res.redirect('/home')
            })

    })



})

module.exports = router