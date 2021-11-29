const express = require('express');
const router = express.Router();
const data = require('../data');
const memoriesData = data.memories;


//block this with middleware to all users
router.get('/', async (req, res) => {
    try {
        const postList = await postData.getAllPosts();
        res.json(postList);
    } catch (e) {
        res.status(500).send();
    }
});


//for individual memories
router.get('/:id', async (req, res) => {
    try {

        //get a memory and display the memory view by its ID
        const memory = await memoriesData.getById(req.params.id);
        res.json(post);

    } catch (e) {
        res.status(404).json({ message: 'Memory not found' });
    }
});


module.exports = router;