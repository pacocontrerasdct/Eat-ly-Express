// REQUIREMENTS //
var express = require('express')
var app = express()
var path = require('path')
var bodyParser = require('body-parser')

// Middleware logging functionality
app.use(function(req, res, next){
  console.log('you made a ' + req.method + ' request to "' + req.url + '" from ' + req.ip);
  console.log('%s request to "%s" from %s', req.method, req.url, req.id);
  next();
})

// CONFIG //

// serve js & css files into a public folder
app.use(express.static(__dirname + '/public'))

// body parser config
app.use(bodyParser.urlencoded({ extended: true }))

// DATA //

// pre-seeded food data
var foods =[
  {id: 0, name: "Sushiritto", yumminess: "quite"},
  {id: 1, name: "Green Eggs & Ham", yumminess: "sure"},
  {id: 2, name: "Crayfish", yumminess: "depending"},
  {id: 3, name: "Foie Gras", yumminess: "omg"},
  {id: 4, name: "Kale", yumminess: "meh"}
]

// ROUTES //

// root path
app.get("/", function (req, res) {
  //render index.html
  res.sendFile(path.join(__dirname + '/public/views/index.html'))
})

// foods index path
app.get("/foods", function (req, res) {
  // render foods index as JSON
    res.json(foods);
})

// foods index path
//app.get("/foods/:id", function (req, res) {
  // render foods index as JSON
  //data = req.body;
  //res.json(data[name]);
//})

app.post("/foods", function (req, res) {
  // add a unique id
  // add new food to DB (array, really...)
  // send a response with newly created object
    var data = req.body;
    var num = foods.length;
    data['id'] = num;
    foods = foods.push(data);
    res.json(data);
})

app.delete('/food/:id', function (req, res) {
  console.log("hitting delete route");
  // finding an object with id = req.body.id out of the foods
  console.log(req.params);
  req.body;
  // remove item from array
  // render deleted object
})

// listen on port 3000
app.listen(3000, function (){
  console.log("listening on port 3000")
})




