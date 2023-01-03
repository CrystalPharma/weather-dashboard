
// var windSpeed = $('#wind-speed').sibling();
// console.log (windSpeed);
// global variables
var city = $('#city').text();
var description = $('#weather-description').text();
var temperature = $('#temperature').text();
var maxMin = $('#maxMin').text();
var weatherIcon = $('#weather-icon').text();
// var windSpeed = $('#wind-speed').sibling;
// console.log(windSpeed);

// current date 
var date = moment().format('MMMM Do YYYY');
// console.log(date);
$('#current-date').text(date);

// current time
var time = moment().format('HH:mm a');
$('#current-time').text(time);


//Ajax
// API key
var APIKey = "cbb0a4faea3b1ca0270bcb088ec725e8";

// Here we are building the URL we need to query the database
var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
  "q=London&appid=" + APIKey;

// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
  url: queryURL,
  method: "GET"
})
  // We store all of the retrieved data inside of an object called "response"
  .then(function (response) {

    // Log the queryURL
    console.log(queryURL);

    // Log the resulting object
    console.log(response);

    //response location
    $("#city").text(response.name);
    //weather description
    $("#weather-description").text(response.weather[0].main);
    //temperature
    $("#temperature").text( (response.main.temp - 273.15).toFixed(0) + "℃" );
    //max min temperature
    $("#maxMin").text((response.main.temp_max - 273.15).toFixed(0) + " / " + (response.main.temp_min - 273.15).toFixed(0) + "℃" );
    //wind-speed
    $("#wind-speed").text('☴ Wind Speed: ' + response.wind.speed + "km/hr");
    //humidity
    $("#humidity").text('⛆ Humidity: ' + response.main.humidity + "%");
    //


  });


//storing src images with different ids