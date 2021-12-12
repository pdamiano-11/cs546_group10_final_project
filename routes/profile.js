const express = require('express');
const router = express.Router();
const usersData = require('../data/users');
const xss = require('xss');

router.get('/', async (req, res) => {
    try{
    user = req.session.user;
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

router.get('/search', async (req, res) => {
    try{
    user = req.session.user;
    console.log('here');
    console.log(user);
    return res.render('memory/profileSearch',{})
    } catch (e) {
        res.redirect('/login');
    }
});


module.exports = router;