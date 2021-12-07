const express = require('express');
const router = express.Router();
const usersData = require('data/users');

router.get('/profile', async (req, res) => {
    try{
    user = req.session.user;
    return res.render('views/memory/profile',
        {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            gender: user.gender,
            age: user.age,
            profilePicture: user.profilePicture
        })
    } catch (e) {
        res.status(500).send();
    }
})