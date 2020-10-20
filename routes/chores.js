const express = require('express');
const router = express.Router();
const db = require('../models')
const bcrypt = require('bcrypt')

function checkAuth(req, res, next) {
    if (req.session.child){
        next();
    }else{
        res.redirect('/child')
    }
}

//login
router.get('/', checkAuth, (req, res) => {
    res.render('child-dock', {
        locals: {
            error: null,
            child: req.session.child
        }
    })
})

//post chores
router.post('/:kid', (req, res) => {
    if (!req.body || !req.body.name) {
        res.render('child-dock', {
            locals: {
                error: 'Please complete all fields',
                kidId: req.query.kid
            }
        })
        console.log('Nope')
        return;
    }
    // Create db to post chores
    const { name, complete, mon, tue, wed, thu, fri, sat, sun } = req.body
    console.log(req.body)
    db.Chore.create({
        name: req.body.name,
        complete: req.body.complete,
        mon: req.body.mon,
        tue: req.body.tue,
        wed: req.body.wed,
        thu: req.body.thu,
        fri: req.body.fri,
        sat: req.body.sat,
        sun: req.body.sun,
        ChildId: req.params.kid
    })
        // after chore is post then redirect to Overview kid
        .then((result) => {
            res.redirect(`/manage/?kid=${req.params.kid}`)
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'A Database Error has Occurred' })
        })
})

module.exports = router