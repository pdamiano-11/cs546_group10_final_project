const express = require('express');
const router = express.Router();
const usersData = require('../data/users');
const xss = require('xss');
const { updateSettings } = require('../data/settings');

router.get('/', async (req, res) => {
    try{
    const user = req.session.user;
    console.log(user);
    //const logout_hbs = {id: req.params.id, title: "Logout"};
    //const memory = await memoriesData.getById(id);
    res.render('../views/memory/settings.handlebars');
    } catch (e) {
        res.redirect('/login');
    }
});
 

// router.post('/', async (req, res) => {
//     try {
//         const user = req.session.user;
//         console.log(user);
//         const userSettings = req.body;
//         const updated = await updateSettings(userSettings);
  
//     } catch (e) {
//         res.redirect('/');
//     }
// });


module.exports = router;

