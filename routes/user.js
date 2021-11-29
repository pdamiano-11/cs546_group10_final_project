const express = require('express');
const router = express.Router();
const data = require('../data');


//main user route
router.get('/', async (req, res) => {
    try {

        res.statusMessage = "On user route.";
        res.status(400).send();
    } catch (e) {
        res.status(500).send();
    }
});



module.exports = router;