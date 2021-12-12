const express = require('express');
const router = express.Router();
const data = require('../data');
const memoriesData = data.memories;

router.get('/', async (req, res) => {
    if (req.session.user) {
        try {
            let user = req.session.user;
            let memories = [];
            for (let n = 0; n < user.memories.length; n++) {
                let mem = await memoriesData.getById(user.memories[n]);
                memories.push(mem);
            }
            res.json(memories);
        }
        catch (e) {
            res.redirect('/profile');
        }
      } else {
        res.redirect('/login');
      }
});

module.exports = router;