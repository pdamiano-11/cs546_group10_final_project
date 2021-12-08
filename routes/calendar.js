const express = require('express');
const router = express.Router();
const data = require('../data');
const memoriesData = data.memories;

router.get('/calendar', async (req, res) => {
    res.render('memory/calendar', {});
});
