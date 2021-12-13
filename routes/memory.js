const express = require('express');
const router = express.Router();
const data = require('../data');
const memoriesData = data.memories;
const xss = require('xss');


//block this with middleware to all users
router.get('/', async (req, res) => {
    if(req.session.user){
        try {
            res.render("memory/create", {pageTitle: "Create a memory"});
        } catch (e) {
            res.status(500).json(e);
        }
    }
    else{
        res.redirect('/login');
    }
});
router.get('/update/:id', async (req, res) => {
    try {
        const memory = await memoriesData.getById(req.params.id);
        res.render('memory/update', {title: "Update Memory", 
            id: memory._id, memtitle: memory.title, description: memory.description, date: memory.date, 
            location: memory.location, favorite: memory.favorite, userId: memory.userId, visibility: memory.visibility});
    } catch (e) {
        res.status(500).json(e);
    }
});

router.post('/', async (req, res) => {
    if (req.session.user) {
        try {
        // do input checking

        let user = req.session.user;
        //const {title, description, date, location, visibility} = xss(req.body);

        const title = xss(req.body.title);
        const description = xss(req.body.description);
        const date = xss(req.body.date);
        const location = xss(req.body.location);
        const favorite = xss(req.body.favorite);
        const visibility = xss(req.body.visibility);

        const newMemory = await memoriesData.create(title, description, date, location, user._id.toString(), visibility, favorite);
        res.redirect(`/memory/${newMemory}`);
        } catch (e) {
            res.status(500).json({message: "Error" + e});
        }
    }
    else {
        res.redirect('/login')
    }
});

//for individual memories
router.get('/:id', async (req, res) => {
    if(req.session.user){
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
    }
    else{
        res.redirect('/login');
    }
});

router.get('/delete/:id', async (req, res) => {
    if(req.session.user){
        try {

            //delete a memory based on its id
            if(req.session.user)
            {   
                const deleted = await memoriesData.delete(req.params.id);
                if(deleted == {deleted: true});
                    res.redirect('/profile');
            }
            else
                res.render('signup');

        } catch (e) {
            res.status(404).json({ message: 'Could not delete memory' });
        }
    }
    else{
        res.redirect('/login');
    }
});

module.exports = router;