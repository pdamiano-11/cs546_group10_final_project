const express = require('express');
const router = express.Router();
const data = require('../data');
const memoriesData = data.memories;


router.get('/', async (req, res) => {
    const memories = await memoriesData.getAll();
    res.json(memories);
});

module.exports = router;