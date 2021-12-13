const express = require('express');
const router = express.Router();
const data = require('../data');
const memoriesData = data.memories;
const xss = require('xss');

router.use('/', async (req, res) => {
    if (req.session.user) {
        try {
            let user = req.session.user;
            console.log(user.memories);
            let memories = [];
            for (let n = 0; n < user.memories.length; n++) {
                let mem = await memoriesData.getById(user.memories[n]);
                memories.push(mem);
            }
            let mems = JSON.stringify(memories);
            res.render('memory/gallery', {memories: mems});
        }
        catch (e) {
            res.json(e);
        }
      } else {
        res.redirect('/login');
      }
});

module.exports = router;