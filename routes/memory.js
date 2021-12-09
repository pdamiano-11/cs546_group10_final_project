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
router.get('/update/:id', async (req, res) => {
    try {
        const memory = await memoriesData.getById(req.params.id);
        res.render('memory/update', {title: "Update Memory", 
            id: memory._id, memtitle: memory.title, description: memory.description, date: memory.date, 
            location: memory.location, userId: memory.userId, visibility: memory.visibility});
    } catch (e) {
        res.status(500).json(e);
    }
});

router.post('/', async (req, res) => {
    if (req.session.user) {
        try {
        // do input checking

        let user = req.session.user;
        const {title, description, date, location, visibility} = req.body;

        const newMemory = await memoriesData.create(title, description, date, location, user._id.toString(), visibility);
        res.redirect(`/memory/${newMemory}`);
        } catch (e) {
            res.status(500).json({message: "Error" + e});
        }
    }
    else {
        res.redirect('/login')
    }
});
router.post('/update/:id', async (req, res) => {
    try {
        // do input checking
        
        const {id, title, description, images, date, location, userId, visibility} = req.body;
    } catch (e) {
        res.status(500).json({message: "Error: " + e});
    }
});

//for individual memories
router.get('/:id', async (req, res) => {
    try {

        //get a memory and display the memory view by its ID
        let id = req.params.id.toString();
        const memory = await memoriesData.getById(id);
        res.render('memory/displayMem', {id: memory._id, title: memory.title, description: memory.description, date: memory.date, location: memory.location, userId: memory.userId, visibility: memory.visibility});

        //auth stuff
        // if(req.session.user){
        //     console.log('true');
        //   }
  
        //   else{
        //     console.log('false');
        //   }

    } catch (e) {
        res.status(404).json({ message: 'Memory not found: ' + e });
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