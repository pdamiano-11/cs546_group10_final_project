const express = require('express');
const router = express.Router();
const data = require('../data');
const bcrypt = require('bcryptjs');
const usersData = data.users;


//main user route
router.get('/', async (req, res) => {
    try {
        if (req.session.user._id) {
            res.redirect('/private');
        }
        return res.render('users/login', {});

    } catch (e) {
        res.status(500).send();
    }
});


router.get('/private', async (req, res) => {
    try {
        user = req.session.user;
        return res.render('users/private', { username: username });

    } catch (e) {
        res.status(404).json({ message: 'User not found' });
    }
});

router.post('/login', async (req, res) => {

    let username = req.body.username;
    let password = req.body.password;
    if(!username) throw 'You must enter a username';
    if(!password) throw 'You must enter a password';
    try {
        user = await usersData.checkUser(username, password);
        req.session.user = { user: user };
        return res.redirect('/private');
    } catch (e) {
        //console.log(e);
        return res.status(400).render('users/badinput', {
            error: e
        })
    }
});

router.get('/logout', async (req, res) => {
    //console.log('here');
    req.session.destroy();
    return res.redirect('/');
});

router.post('/signup', async (req, res) => {
    if (req.session.user) {
        res.redirect('/private');
    }

    try {
        let username = req.body.username;
        let password = req.body.password;
        let firstName = re.body.firstName;
        let lastName = req.body.lastName;
        let age = req.body.age;
        let gender = req.body.gender;
        let email = req.body.email;

        await usersData.createUser(firstName, lastName, email, gender, age, username, password);

        return res.redirect('/');
    } catch (e) {
        if (e) {
            res.status(400).render('users/badinput', {
                error: e
            })
        }
        else {
            res.status(500).render('users/error', {
                error: 'Internal Server Error'
            })
        }
    }
});


module.exports = router;