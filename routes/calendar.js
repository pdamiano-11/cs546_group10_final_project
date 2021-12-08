const express = require('express');
const router = express.Router();

router.get('/calendar', async (req, res) => {
    res.render('memory/calendar', {title: "Calendar"});
});
