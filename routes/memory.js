const express = require('express');
const router = express.Router();
const data = require('../data');
const memoriesData = data.memories;


//block this with middleware to all users
router.get('/', async (req, res) => {
    try {
        res.render("memory/create", {pageTitle: "Create a memory"});
    } catch (e) {
        res.status(500).json(e);
    }
});
router.get('/update', async (req, res) => {
    try {
        res.render("memory/update", {pageTitle: "Update a memory"});
    } catch (e) {
        res.status(500).json(e);
    }
});

router.post('/', async (req, res) => {
    try {
        // do input checking

        const {title, description, date, location, userId, visibility} = req.body;

        const newMemory = await memoriesData.create(title, description, date, location, userId, visibility);
        res.redirect(`/memory/${newMemory}`);
    } catch (e) {
        res.status(500).json(e);
    }
});
router.post('/update', async (req, res) => {
    try {
        // do input checking

        const {id, title, description, images, date, location, userId, visibility} = req.body;

        const newMemory = await memoriesData.update(id, title, description, images, date, location, userId, visibility);
        res.redirect(`/memory/${id}`);
    } catch (e) {
        res.status(500).json(e);
    }
});

//for individual memories
router.get('/:id', async (req, res) => {
    try {

        //get a memory and display the memory view by its ID
        const memory = await memoriesData.getById(req.params.id);
        res.render('memory/displayMem', {id: memory._id, title: memory.title, description: memory.description, date: memory.date, location: memory.location, userId: memory.userId, visibility: memory.visibility});

    } catch (e) {
        res.status(404).json({ message: 'Memory not found' });
    }
});

router.delete('/:id', async (req, res) => {
    try {

        //delete a memory based on its id
        const deleted = await memoriesData.delete(req.params.id);
        res.json(deleted);

    } catch (e) {
        res.status(404).json({ message: 'Could not delete memory' });
    }
});

module.exports = router;