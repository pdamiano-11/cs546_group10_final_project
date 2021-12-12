const express = require('express');
const router = express.Router();
const data = require('../data');
const xss = require('xss');


//main map route
router.get('/', async (req, res) => {
    try {

        res.statusMessage = "On map route.";
        res.status(400).send();
    } catch (e) {
        res.status(500).send();
    }
});



module.exports = router;