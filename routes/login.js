const express = require('express');
const router = express.Router();
const path = require('path');
const users = require('../data/users');


router.get('/', async (req, res) => {

  try{
    //check for auth here and if authed, then route back to '/'???????
  if(req.session.user){
    console.log('true');
    res.redirect('/');
  }

  else{
    console.log('User not authed. Rendering Login Page.');
    //res.sendFile(path.join(__dirname+'/../public/html/login.html'));
    req.session.destroy();
    
    const main_hbs = {id: req.params.id, title: "MyMemoryMap Home"};
    res.render('memory/login');
  }

  
  }
  catch (e) {
   await res.status(404).send('Sorry, page not found.');
  }
  
});

//get to here from middleware
router.post('/', async (req, res) => {
  try {
    //auth stuff
    //console.log("try");

    const user_input =  await req.body;

    console.log(user_input);

    let input_username = user_input.username;
    let input_password = user_input.password;


    const user_check = await users.checkUser(input_username, input_password);

    console.log("Redirecting to /...");
    req.session.user = {user: user_check};
    res.redirect('/');


   } catch (e) {
    res.redirect('/');
  }
});


module.exports = router;
