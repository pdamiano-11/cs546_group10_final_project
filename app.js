const express = require('express');
const app = express();
const configRoutes = require('./routes');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const data = require('./data');
const memoriesData = data.memories;

const static = express.static(__dirname + '/public');
app.use('/public', static);
app.use(cookieParser());
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
app.set('etag', false);

app.use(express.json());

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
});

app.use(
  session({
    name: 'AuthCookie',
    secret: "seecret_placed_here",
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 60000 }
  })
);

app.use(morgan('dev'));

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, __dirname + '/public/static');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});
const upload = multer({storage});


app.post('/memory/update', upload.single('images'), async (req, res) => {
  if (!req.file) {
    console.log("No file received");

  } else {
      console.log('file received'); 
  }
  const {id, title, description, images, date, location, userId, visibility} = req.body;
  const memory = await memoriesData.update(id, title, description, "images", date, location, visibility);
  res.redirect(`/memory/${id}`);
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});