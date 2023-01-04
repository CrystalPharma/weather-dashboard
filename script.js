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

// city variable target on input form
var city = $('#city').val();
//Ajax
// API key
var APIKey = "cbb0a4faea3b1ca0270bcb088ec725e8";

// Here we are building the URL we need to query the database
// var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
//   "q=London&appid=" + APIKey;

$(document).ready(function () {
  $('#submitWeather').click(function () {
    var city = $('#city').val();
    if (city != '') {
      $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + "&appid=" + APIKey,
        method: "GET",
        dataType: "jsonp",
        success: function (data) {
          console.log(data);
          //response location
          $("#cityResult").text(data.name);
          //weather description
          $("#weather-description").text(data.weather[0].main);
          //temperature
          $("#temperature").text((data.main.temp - 273.15).toFixed(0) + "℃");
          //max min temperature
          $("#maxMin").text((data.main.temp_max - 273.15).toFixed(0) + " / " + (data.main.temp_min - 273.15).toFixed(0) + "℃");
          //weather icon
          $('#weather-icon').text(iconsrc);
          var iconsrc = "<img src='http://openweathermap.org/img/w/' + data.weather[0].icon + '.png'>"
          // var iconRef = "http://openweathermap.org/img/w/" +(data.weather[0].icon) + ".png";
          // $('#weather-icon').attr('src',iconRef);
          //wind-speed
          $("#wind-speed").text('☴ Wind Speed ' + data.wind.speed + "km/hr");
          //humidity
          $("#humidity").text('⛆ Humidity ' + data.main.humidity + "%");
          //

        }
      });
    } else {
      $("#error").html('Please fill in a valid city')
    }
  });
});



// //storing src images with different ids