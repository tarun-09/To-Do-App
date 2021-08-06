var express = require('express');
var todocontroller = require('./controllers/todocontroller');
var app = express();

//set-up Template Engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//Fire Controllers
todocontroller(app);

//Listening to the port
app.listen(3000)
console.log("You are listening to port 3000")