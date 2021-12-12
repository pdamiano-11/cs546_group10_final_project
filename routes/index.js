const mapRoutes = require('./map');
const memoryRoutes = require('./memory');
const loginRoutes = require('./login');
const logoutRoutes = require('./logout');
const signupRoutes = require('./signup');
const calendarRoutes = require('./calendar');
const galleryRoutes = require('./gallery');
const profileRoutes = require('./profile');
const jsonRoutes = require('./getmems');
const { nextTick } = require('process');
const express = require('express');
const xss = require('xss');
const app = express();

const constructorMethod = (app) => {
  app.use('/map', mapRoutes);
  app.use('/memory', memoryRoutes);
  app.use('/login', loginRoutes);
  //console.log('Processed the Login Route');
  app.use('/logout', logoutRoutes);
  app.use('/signup', signupRoutes);
  app.use('/gallery', galleryRoutes);
  app.use('/getmemories', jsonRoutes);
  app.use('/calendar', calendarRoutes);
  app.use('/profile', profileRoutes);

  app.use(express.static(__dirname + '../views'));
  app.use(express.static(__dirname + '../public'));
  //app.use(express.static(__dirname + '../views'));

  app.use(express.urlencoded({extended: true}));
  

  app.get('/', async function(req,res){
    try{

        if(req.session.user){
          console.log('User is correctly logged in');
          const main_hbs = {id: req.params.id, title: "MyMemoryMap Home"};
          res.render('../views/memory/homepage.handlebars', main_hbs);
        }

        else{
          console.log('User not authenticated. Redirecting to login.');
          res.redirect('/login');
        }

    }
    catch (e) {
     await res.status(404).send('Sorry, page not found.');
    }
  });

  

  //if not authorized, send to login route

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};

module.exports = constructorMethod;