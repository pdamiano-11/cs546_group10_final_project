const express = require('express');
const router = express.Router();

router.get('/view', async (req, res) => {
    if (req.session.user) {
        res.render('memory/calendar', {title: "Calendar"});
    }
    else {
        res.redirect('/login');
    }
});

module.exports = router;