const mapRoutes = require('./map');
const memoryRoutes = require('./memory');
const userRoutes = require('./user');
const { nextTick } = require('process');
const express = require('express');
const app = express();

const constructorMethod = (app) => {
  app.use('/map', mapRoutes);
  app.use('/memory', memoryRoutes);
  app.use('/user', userRoutes);

  app.use(express.static(__dirname + '../views'));
  app.use(express.static(__dirname + '../public'));
  //app.use(express.static(__dirname + '../views'));

  app.use(express.urlencoded({extended: true}));
  

  app.get('/', async function(req,res){
    try{
        console.log(new Date().toUTCString());
        console.log(req.method);
        console.log(req.originalUrl);
        if(req.session.user){
          console.log('true');
        }

        else{
          console.log('false');
        }
      //if authed
      //res.redirect('/private');

      //if not authed
      //res.sendFile(path.join(__dirname+'/../public/login.html'));
      res.redirect('/login');

    }
    catch (e) {
     await res.status(404).send('Sorry, page not found.');
    }
  });

  

  //if not authorized, send to login route
  app.use('/login', loginRoutes);
  console.log('Processed the Login Route');
  
  app.use('/private', privateRoutes);
  app.use('/signup', signupRoutes);
  app.use('/logout', logoutRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};

module.exports = constructorMethod;