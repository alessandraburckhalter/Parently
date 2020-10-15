const express = require('express');
const router = express.Router();
const db = require('../models')
const bcrypt = require('bcrypt')


//Login Route
router.get('/', (req, res) => {
    res.render('login', {
        locals: {
            error: null
        }
    })  
})

router.post('/', (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.render('login', {
            locals: {
                error: 'Please submit all required field'
            }
        })
        return;
    }

    db.Parent.findOne({
        where: {
            email: req.body.email
        }
    })
        .then((user) => {
            if (!user) {
                res.render('login', {
                    locals: {
                        error: 'No account with that email'
                    }
                })
                return;
            }

            bcrypt.compare(req.body.password, user.password, (err, matched) => {

                if (matched) {
                    req.session.user = user
                    res.redirect('/home')
                } else {
                    res.render('login', {
                        locals: {
                            error: console.log('Incorrect password')
                        }
                    })
                    return;
                }
                return;
            })
        })
})
console.log('complete')

module.exports = router