const express = require('express');
const router = express.Router();
const data = require('../data');
const usersData = data.users;


//main user route
router.get('/', async (req, res) => {
    try {

        res.statusMessage = "On user route.";
        res.status(400).send();
    } catch (e) {
        res.status(500).send();
    }
});


router.get('/:id', async (req, res) => {
    try {
        //get a user and display the memory view by its ID
        
        //for some reason ID does not exist in data/users
        const user = await usersData.getById(req.params.id);
        console.log(user);
        res.json(post);

    } catch (e) {
        res.status(404).json({ message: 'User not found' });
    }
});



module.exports = router;