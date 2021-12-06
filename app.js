const express = require('express');
const app = express();
const configRoutes = require('./routes');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');

const static = express.static(__dirname + '/public');
app.use('/public', static);
//app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

const handlebarsInstance = exphbs.create({
  defaultLayout: 'main',
  // Specify helpers which are only registered on this instance.
  helpers: {
    asJSON: (obj, spacing) => {
      if (typeof spacing === 'number')
        return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

      return new Handlebars.SafeString(JSON.stringify(obj));
    }
  }
});

app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');

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