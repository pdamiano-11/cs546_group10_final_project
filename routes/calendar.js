const express = require('express');
const router = express.Router();
const xss = require('xss');

router.use('/', async (req, res) => {
    if (req.session.user) {
        try{
            res.render('memory/calendar', {title: "Calendar"});
        }
        catch (e){
            res.status(404).json("Error:"+ e)
        }
    }
    else {
        res.redirect('/login');
    }
});

module.exports = router;