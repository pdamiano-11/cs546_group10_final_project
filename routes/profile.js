const express = require('express');
const router = express.Router();
const usersData = require('../data/users');
const xss = require('xss');

router.get('/', async (req, res) => {
    try{
    const user = req.session.user;
    console.log(user);
    return res.render('memory/profile',
        {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            gender: user.gender,
            age: user.age,
            //profilePicture: user.profilePicture
        })
    } catch (e) {
        res.redirect('/login');
    }
});


module.exports = router;