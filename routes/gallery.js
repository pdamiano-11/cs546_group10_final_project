const express = require('express');
const router = express.Router();
const data = require('../data');
const memoriesData = data.memories;

router.get('/gallery', async (req, res) => {
    // Get all memories and process and show them

    const memories = await memoriesData.getAll();
    res.render('memory/gallery', {memories: memories});
    
});

router.get('/gallery/get', async (req, res) => {
    const memories = await memoriesData.getAll();
    res.json(memories);
});