const express = require('express');
const app = express();
const configRoutes = require('./routes');
const { engine } = require('express-handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', __dirname + '/views');
app.engine('handlebars', engine({ extname: '.handlebars', defaultLayout: "main"}));
app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});