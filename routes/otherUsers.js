const express = require('express');
const router = express.Router();
const usersData = require('../data/users');
const xss = require('xss');

router.get('/', async (req, res) => {
    try{
    const user = req.session.user;
    console.log(user);
    return res.render('memory/profileSearch',{})
    } catch (e) {
        res.redirect('/login');
    }
});

router.post('/', async (req, res) => {
    if(!req.session.user){
        res.redirect('/login');
    }
    try{
        const user = req.session.user;
        const other_username = req.body.search_term;
        console.log(other_username);
        const other_user = await usersData.getUserByUsername(other_username);
        console.log(user);
        return res.render('memory/profileFound',{
            profilePicture: other_user.profilePicture,
            firstName: other_user.firstName,
            email: other_user.email,
            gender: other_user.gender,
            age: other_user.age,
            username: other_user.username
    });
    } catch (e) {
        res.render('memory/profileSearch',{error: 'Unable to find user'})
    }
});

router.get('/gallery', async (req, res) => {
    if(!req.session.user){
        res.redirect('/login');
    }
    try{
        const user = req.session.user;
        const other_username = await req.body;
        console.log(other_username);
        const other_user = await getUserByUsername(other_username);
        console.log(user);
        return res.json(other_user.memories);
    } catch (e) {
        res.render('memory/profileSearch',{error: 'Unable to find user'})
    }
});



module.exports = router;
