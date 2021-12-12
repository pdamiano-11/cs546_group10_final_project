const express = require('express');
const router = express.Router();
const data = require('../data');
const path = require('path');
const users = data.users;
const xss = require('xss');


router.get('/', async (req, res) => {

    try{
        
    if(req.session.user){
      console.log('No need to signup. You are authed.');
      res.redirect('/index');
    }
  
    else{
        console.log('You are not authed. Sign up now!');
        //res.sendFile(path.join(__dirname+'/../public/html/signup.html'));

        const main_hbs = {id: req.params.id, title: "Signup"};
        res.render('../views/memory/signup.handlebars', main_hbs);
    }
  
    
    }
    catch (e) {
     await res.status(404).send('Sorry, page not found.');
    }
    
  });

router.post('/', async (req, res) => {
  try {

    const user_input = await req.body;

    console.log(user_input);

    let input_firstName = xss(user_input.firstName);
    let input_lastName = xss(user_input.lastName);
    let input_email = xss(user_input.email);
    let input_gender = xss(user_input.gender);
    let input_age = xss(user_input.age);
    let input_username = xss(user_input.username);
    let input_password = xss(user_input.password);


    const user_check = await users.createUser(input_firstName, input_lastName, input_email, input_gender, input_age, input_username, input_password);


    if (!user_check) {
      res.redirect('/login');
    }

    else {
      console.log("Redirecting to /profile...");
      req.session.user = { username: input_username, password: input_password };
      res.redirect('/profile');
    }


  } catch (e) {
    await res.status(404).send('Sorry, page not found: ' + e);
  }
});


module.exports = router;