const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

//displays index.html of root path
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

//invoked after hitting go in the html form
app.post("/", function(req, res) {
    
    // takes in the city from the html form, display in // console. Takes in as string.
        var latitude = parseFloat(req.body.latInput);
        console.log(req.body.latInput);
        var longitude = parseFloat(req.body.longInput);
        console.log(req.body.longInput);

    //build up the URL for the JSON query, API Key is // secret and needs to be obtained by signup 
        const units = "imperial";
        const apiKey = "8863bbe14bd7f26d94be2e6658a29c4d";
        const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=" + apiKey;
    
    // this gets the data from Open WeatherPI
    https.get(url, function(response){
        console.log(response.statusCode);
        
        // gets individual items from Open Weather API
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const city = weatherData.name;
            const humidity = weatherData.main.humidity;
            const tempMin = weatherData.main.temp_min;
            const tempMax = weatherData.main.temp_max;
            const windSpeed = weatherData.wind.speed;
            const windDirection = weatherData.wind.deg;
            const weatherDescription = weatherData.weather[0].description; 
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"; 
            
            // displays the output of the results
            res.write("<h1> The weather is " + weatherDescription + "<h1>");
            res.write("<h2>The Temperature in this location is a (max)of " + tempMax + "& (min) of " + tempMin + " Degrees Fahrenheit<h2>");
            res.write("Wind Direction is " + windDirection + "degrees with wind speed of " + windSpeed+  " mph");
            res.write("<img src=" + imageURL +">");
            res.send();
        });
    });
})


//Commented out these lines in Repl
//Uncomment these lines when running on laptop
app.listen(process.env.PORT || 3000, function() {
console.log ("Server is running on port")
});