const express = require('express');
const router = express.Router();
const data = require('../data');
const path = require('path');


router.get('/', async (req, res) => {

    try{
        
    if(req.session.user){
      console.log('true');
      res.redirect('/index');
    }
  
    else{
        
        res.sendFile(path.join(__dirname+'/../public/html/signup.html'));
    }
  
    
    }
    catch (e) {
     await res.status(404).send('Sorry, page not found.');
    }
    
  });

  router.post('/', async (req, res) => {
    try {
  
      const user_input =  await req.body;

      console.log(user_input);

      let input_username = user_input.username;
      let input_password = user_input.password;
  
  
      const user_check = await users.checkUser(input_username, input_password);
  
  
      if(!user_check){
        res.redirect('/login');
      }
  
      else{
        console.log("Redirecting to /private...");
        req.session.user = {username: input_username, password: input_password};
        res.redirect('/private');
      }
  
  
     } catch (e) {
      await res.status(404).send('Sorry, page not found.');
    }
  });


module.exports = router;