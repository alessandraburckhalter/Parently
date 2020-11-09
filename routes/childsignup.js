const express = require('express');
const router = express.Router();
const db = require('../models')
const bcrypt = require('bcrypt')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
    cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname)
    }
});


const upload = multer({ storage: storage });


router.get('/', (req, res) => {
    res.render('child-sign-up', {
        locals: {
            error: null
        }
    })
})

//register kids
router.post('/', upload.single('childImage'), (req, res, next) => {
    if (!req.body.first_name || !req.body.password) {
        res.render('kids', {
            locals: {
                error: 'Please complete all fields'
            }
        })
        console.log('Nope')
        return;
    }


    const { user_name, first_name, last_name, password, childImage } = req.body
    bcrypt.hash(password, 10, (err, hash) => {

        db.Child.create({
            first_name: first_name,
            last_name: last_name,
            user_name: user_name,
            password: hash,
            childImage: "/" + req.file.path,
            ParentId: req.session.user.id

        })
            .then((result) => {
                res.redirect('/overview')
            })

    })



})

module.exports = router