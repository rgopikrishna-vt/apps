var weatherapiurl = "http://api.openweathermap.org/data/2.5/weather?zip=";
var apikey = "&appid=982020529e2889130abd1b2019028ed6";

var express = require("express");
var app = express();

var index = app.get("/location/:zipcode", function(req, response) {
  params = req.params;
  var fullweatherurl = "";
  var unitsparam = "kelvin";
  var units = "";
  if (req.query.scale) {
    unitsparam = req.query.scale.toString().toLowerCase();
    if (unitsparam == "celsius") {
      units = "&units=Metric";
    } else if (unitsparam == "kelvin") {
      units = "";
    } else if (unitsparam == "fahrenheit") {
      units = "&units=Imperial";
    } else {
      throw "Unit not supported.";
    }
  }
  var fullweatherurl = weatherapiurl + params.zipcode + units + apikey;
  var request1 = require("request");
  request1(fullweatherurl, function(err, res, body) {
    if (res.statusCode == 404) {
      response.status(404).send("Zip code requested not found.");
    } else {
      var res = JSON.parse(body);
      response.write(
        JSON.stringify({
          temperature: res.main.temp,
          scale: unitsparam
        })
      );
    }
    response.end();
  });
});

app.listen(8080);
module.exports = index;
