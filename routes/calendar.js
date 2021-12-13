const express = require('express');
const router = express.Router();
const xss = require('xss');

router.use('/', async (req, res) => {
    if (req.session.user) {
        res.render('memory/calendar', {title: "Calendar"});
    }
    else {
        res.redirect('/login');
    }
});

module.exports = router;