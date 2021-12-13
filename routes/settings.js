const express = require('express');
const router = express.Router();
const usersData = require('../data/users');
const xss = require('xss');

router.get('/', async (req, res) => {
    try{
    user = req.session.user;
    console.log(user);
    //const logout_hbs = {id: req.params.id, title: "Logout"};
    res.render('../views/memory/settings.handlebars');
    } catch (e) {
        res.redirect('/login');
    }
});


router.post('/', async (req, res) => {
    try {
  
  
    } catch (e) {
        res.redirect('/');
    }
});


module.exports = router;