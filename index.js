// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
/* app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
}); */

// This is the solution for this task
app.get("/api/:date?", function (req, res) {
  
  receivedDate = req.params.date
  console.log(receivedDate)

  var isDate = function(date) {
    return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
  }
  if (receivedDate == undefined) {
    let emptyDate = new Date()
    res.json({"unix": emptyDate, "utc": emptyDate.toString()})
  }
  else if (!isDate(receivedDate)) {
    res.json({ error : "Invalid Date" })
  }
  else {
    let date = new Date(receivedDate)
    res.json({"unix": date, "utc": date.toString()})
  }

  /* if (req.params.date == '') {
    date = new Date()
  }
  else {
    date = Number(req.params.date)
  }
  console.log(date)
  console.log(new Date())
  console.log(Date.now())
  console.log(new Date(0))
  const dateEpochTime = new Date(date); // passing epoch timestamp
  console.log(dateEpochTime)
  res.json({"unix": date, "utc": dateEpochTime.toString()}) */
  
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
