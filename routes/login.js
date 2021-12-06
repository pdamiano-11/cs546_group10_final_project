const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const path = require('path');
const app = express();
//const public = require('../public');
const users = require('../data/users');


router.get('/', async (req, res) => {



  try{
    //check for auth here and if authed, then route back to '/'???????
  if(req.session.user){
    console.log('true');
    res.redirect('/index');
  }

  else{
    console.log('false');
    res.sendFile(path.join(__dirname+'/../public/login.html'));
  }

  
  }
  catch (e) {
   await res.status(404).send('Sorry, page not found.');
  }
  //res.render('../public/login.html');
});

//get to here from middleware
router.post('/', async (req, res) => {
  try {

    console.log(new Date().toUTCString());
        console.log(req.method);
        console.log(req.originalUrl);
        if(req.session.user){
          console.log('true');
        }

        else{
          console.log('false');
        }
    //console.log("try");

    const user_input =  await req.body;

    //console.log("USER INPUT: ");
    console.log(user_input);
    //console.log("____________");

    input_username = user_input.username;
    input_password = user_input.password;

    console.log(input_username);
    console.log(input_password);



    const user_check = await users.checkUser(input_username, input_password);

    console.log(user_check);



    if(user_check == 400){
      //redirect to the login again
      //activate the error div class
      console.log("Error Code: 400")
      console.log("Invalid login credentials. Try again.")
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
