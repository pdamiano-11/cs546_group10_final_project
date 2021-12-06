const express = require('express');
const router = express.Router();
const path = require('path');
const users = require('../data/users');


router.get('/', async (req, res) => {

  try{
    //check for auth here and if authed, then route back to '/'???????
  if(req.session.user){
    console.log('true');
    res.redirect('/index');
  }

  else{
    console.log('User not authed. Rendering Login Page.');
    res.sendFile(path.join(__dirname+'/../public/html/login.html'));
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

    //console.log("USER INPUT: ");
    console.log(user_input);
    //console.log("____________");

    let input_username = user_input.username;
    let input_password = user_input.password;

    //console.log(input_username);
    //console.log(input_password);

    const user_check = await users.checkUser(input_username, input_password);


    if(!user_check){
      //invalid login credentials
      res.redirect('/login');
    }

    else{
      //console.log('setting the user');
      //req.session.user = { username: input_username, password: input_password, userId: user_input._id };

      //console.log(req.session.user);
      console.log("Redirecting to /private...");
      req.session.user = {username: input_username, password: input_password};
      res.redirect('/private');
    }


   } catch (e) {
    await res.status(404).send('Sorry, page not found.');
  }
});


module.exports = router;
