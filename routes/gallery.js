const express = require('express');
const router = express.Router();
const data = require('../data');
const memoriesData = data.memories;

router.get('/view', async (req, res) => {
    // Get all memories and process and show them
    if (req.session.user) {
        res.render('memory/gallery', {memories: req.session.user.user.memories});
    } else {
        res.redirect('/login');
    }
    
});

router.get('/gallery/get', async (req, res) => {
    const memories = await memoriesData.getAll();
    res.json(memories);
});

module.exports = router;