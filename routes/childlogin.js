const express = require('express');
const router = express.Router();
const db = require('../models')
const bcrypt = require('bcrypt')


//Login Route
router.get('/', (req, res) => {
    res.render('child-login', {
        locals: {
            error: null
        }
    })  
})

router.post('/', (req, res) => {
    if (!req.body.user_name || !req.body.password) {
        res.render('child-login', {
            locals: {
                error: 'Please submit all required field'
            }
        })
        return;
    }

    db.Child.findOne({
        where: {
            user_name: req.body.user_name
        }
    })
        .then((user) => {
            if (!user) {
                res.render('child-login', {
                    locals: {
                        error: 'No account with that email'
                    }
                })
                return;
            }

            bcrypt.compare(req.body.password, user.password, (err, matched) => {

                if (matched) {
                    req.session.user = null
                    req.session.child = user
                    res.redirect('/chores')
                } else {
                    res.render('child-login', {
                        locals: {
                            error: 'Incorrect password'
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