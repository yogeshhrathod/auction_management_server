const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./src/API/Routes')
const fileUpload = require('express-fileupload');
const session = require('express-session');
var publicDir = require('path').join(__dirname,'/images');
app.use(express.static(publicDir));

app.use(fileUpload());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    
});

app.listen(3004, () => {
    console.log(`Server started on port 3004`);
});
app.use(routes);