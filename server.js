// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// challenge code here:

function handleAsync (err, data) {
  if (err) throw err
  console.log("success")
}

var noDatify = function (done) {
  app.get("/api/timestamp/", function (req, res) {
    var date = new Date()
    res.json({unix: date.getTime(), utc: date.toUTCString()});
  });
}

var datify = function (done) {
  app.get("/api/timestamp/:date_string", function (req, res) {
    var dateString = req.params.date_string
    if (isNaN(Date.parse(dateString))) {
      res.json({error: "Invalid Date"});
    } else {
      var date = new Date(dateString)
      res.json({unix: date.getTime(), utc: date.toUTCString()});
    }
  });
}

noDatify(handleAsync)
datify(handleAsync)


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});