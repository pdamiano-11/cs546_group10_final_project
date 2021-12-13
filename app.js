const express = require('express');
const app = express();
const configRoutes = require('./routes');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const data = require('./data');
const xss = require('xss');
const memoriesData = data.memories;
const image = data.images;

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
const checkStrings = async function checkStrings(string) {
  if (typeof(string) !== 'string') {
      throw "app.js: Not a String";
  }

  string = string.trim();

  if (string.length === 0) {
      throw "app.js: String too short";
  }

}

app.post('/memory/update', upload.single('images'), async (req, res) => {
  if(req.session.user){
    try{
      if (!req.file) {
        console.log("No file received");

      } else {
          console.log('file received'); 
      }
      const id = xss(req.body.id);
      const title = xss(req.body.title);
      const description = xss(req.body.description);
      const caption = xss(req.body.caption);
      const date = xss(req.body.date);
      const location = xss(req.body.location);
      const visibility = xss(req.body.visibility);
      if(!title || !description || !date || !caption|| !location || !visibility)
            throw "All fields must have inputs";
      await checkStrings(title);
      await checkStrings(description);
      await checkStrings(caption);
      await checkStrings(date);
      await checkStrings(location);
      await checkStrings(visibility);
      const mem = await memoriesData.getById(id);
      let removed;
      if(mem.images.length > 0){
        for(let i = 0; i < mem.images.length; i++)
          removed = await image.remove(mem.images[i]._id.toString());
      }
      const link = '/public/static/' + req.file.originalname;
      const imageDoc = await image.create(id, caption, link)
      let images;
      if(imageDoc.imageAdded == true)
      {
        images = true
        let favorites = true;
        console.log("in if")
        const memoryimg = await memoriesData.update(id, title, description, date, location, visibility, images, favorites);
      }
      else
      {
        images = false;
        let favorites = true;
        console.log("in else")
        const memory = await memoriesData.update(id, title, description, date, location, visibility, images, favorites);
      }
      res.redirect(`/memory/${id}`);
  }catch(e){
    res.status(500).json({message: "Error " + e});
  }
  }
  else{
    res.redirect('/login');
  }
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});