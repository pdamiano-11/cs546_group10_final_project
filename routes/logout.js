const express = require('express');
const router = express.Router();
const path = require('path');
const users = require('../data/users');
const xss = require('xss');


router.get('/', async (req, res) => {

  try{
    //check for auth here and if authed, then route back to '/'???????
    req.session.destroy();
    console.log('true');
    //res.redirect('/');
    const logout_hbs = {id: req.params.id, title: "Logout"};
    res.render('../views/memory/logout.handlebars', logout_hbs);

  }
  catch (e) {
   await res.status(404).send('Sorry, page not found.');
  }
  
});



module.exports = router;
