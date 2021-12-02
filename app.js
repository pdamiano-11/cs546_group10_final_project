const express = require('express');
const app = express();
const configRoutes = require('./routes');
const session = require('express-session');
const cookieParser = require('cookie-parser');
//const { engine } = require('express-handlebars');

const static = express.static(__dirname + '/public');
app.use('/public', static);
//app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

//app.engine('handlebars', engine({extname: '.handlebars', defaultLayout: 'main'}));
//app.set('view engine', 'handlebars');
//app.set("views", "./views");


app.use(express.json());


app.use(
  session({
    name: 'AuthCookie',
    secret: "seecret_placed_here",
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 60000 }
  })
);

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});