// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});



// This is the solution for this task
app.get("/api/:date?", function (req, res) {

  receivedDate = req.params.date
  console.log(receivedDate)

  var isDate = function (date) {
    return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
  }

  if (receivedDate == undefined) {
    let emptyDate = new Date()
    res.json({ "unix": emptyDate.getTime(), "utc": emptyDate.toGMTString() })
  }
  else if (isDate(receivedDate)) {
    let date = new Date(receivedDate)
    console.log(date.getTime())
    res.json({ "unix": date.getTime(), "utc": date.toGMTString() })
  }
  else {
    let endTime = new Date()
    endTime = Number(endTime.getTime())
    let newDate = new Date(Number(receivedDate))
    let time = newDate.getTime()
    console.log(time, endTime)
    if (time >= 0 && Number(time) <= endTime) {
      res.json({ "unix": time, "utc": newDate.toGMTString() })

    }
    else {
      res.json({ error: "Invalid Date" })
    }
  }

});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
