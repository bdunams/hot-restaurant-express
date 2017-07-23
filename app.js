// Dependencies
// =============================================================
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const email = require('./email.js')

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Reservations (DATA)
// =============================================================
let reservations = [{
  //routeName: "yoda",
  name: "John",
  phone: "(216) 555-5555",
  email: 'dabadestboy1@gmail.com',
  id: 1
},
{
  //routeName: "yoda",
  name: "Brian",
  phone: "(216) 280-0808",
  email: 'email2email.com',
  id: 2
}];

let waitlist = [];

// Routes
// =============================================================

app.use('/assets', express.static(__dirname + '/public'))

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
  
});

app.get("/reservations", function(req, res) {
  return res.json(reservations);
});

app.get('/tables/api',function(req, res) {
  return res.json(reservations);
});

app.get('/tables/clear',function(req, res) {
  reservations = [];
  res.redirect('/tables');
});

// Create New Reservations - takes in JSON input
app.post("/reserve", function(req, res) {
  var newReservation = req.body;
  //newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();
  
  res.redirect('/tables');

  console.log(newReservation);
  
  if(reservations.length < 5){
    reservations.push(newReservation);
  }
  else{
    waitlist.push(newReservation);
  }

  res.json(newReservation);
  
});

app.post('/tables/email', function(req, res){
  var newEmailAddress = req.body;
  
  console.log(newEmailAddress);
  
  email(newEmailAddress.email);
})

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
