var description = $('#weather-description').text();
var temperature = $('#temperature').text();
var maxMin = $('#maxMin').text();
var weatherIcon = $('#weather-icon').text();
const cityBtn = $('#citybuttons');
// current date 
var date = moment().format('MMMM Do YYYY');
$('#current-date').text(date);

// city variable target on input form
var city = $('#city').val();
let history = []

// API key
var APIKey = "cbb0a4faea3b1ca0270bcb088ec725e8";

$(document).ready(function () {
  $('#submitWeather').click(function () {
    var city = $('#city').val();
    history.push(city);
    if (city != '') {
      $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + "&appid=" + APIKey,
        method: "GET",
        dataType: "jsonp",
        success: function (data) {
          //response location
          $("#cityResult").text(data.name);
          //weather description
          $("#weather-description").text(data.weather[0].main);
          //temperature
          $("#temperature").text((data.main.temp - 273.15).toFixed(1) + "℃");
          //max min temperature
          $("#maxMin").text((data.main.temp_max - 273.15).toFixed(0) + " / " + (data.main.temp_min - 273.15).toFixed(0) + "℃");
          //weather icon
          // $('#weather-icon').text(iconsrc);
          var iconsrc = data.weather[0].icon;
          document.querySelector('.icon').src = "https://openweathermap.org/img/wn/" + iconsrc + "@2x.png";
          $("#wind-speed").text('☴ Wind Speed ' + ((data.wind.speed) * 3.6).toFixed(2) + "kph");
          //humidity
          $("#humidity").text('⛆ Humidity ' + data.main.humidity + "%");
          //var prev_data = JSON.parse(localStorage.getItem('cities')) || [];
          // localStorage.setItem('cities', JSON.stringify(city));
          localStorage.setItem('data', JSON.stringify(history));
         gethistory()
        }
      });
    } else {
      $("#error").html('Please fill in a valid city')
    }
  });
})
$('#submitWeather').click(function () {
  var city = $('#city').val();
  var APIKey = "cbb0a4faea3b1ca0270bcb088ec725e8";
  let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIKey}`;
  $.ajax({
    url: forecastURL,
    method: "GET"
  }).then(function (response) {
    const list = response.list;
    // console.log(list);
    for (let i = 0; i <= 4; i++) {
      const date = new Date((response.list[((i + 1) * 8) - 1].dt) * 1000).toLocaleDateString();
      const iconcode = list[i].weather[0].icon;
      const tempK = (list[i].main.temp).toFixed(1);
      const humidity = list[i].main.humidity;
      const windSpd = ((list[i].wind.speed) * 3.6).toFixed(2);
      $("#fDate" + i).text(date);
      document.querySelector("#fImg" + i).src = "https://openweathermap.org/img/wn/" + iconcode + "@2x.png";
      $("#fTemp" + i).text(tempK + "℃");
      $("#fHumidity" + i).text("Humidity " + humidity + "%");
      $("#fWind" + i).text("Wind Speed " + windSpd + "kph");
    }

    console.log(list)
  });
})

function gethistory() {
  // var lastIndex = historyArr.length - 1;
  // var btn = $("<button></button>").text(historyArr[lastIndex])
  // $('#citybuttons').append(btn);
  var historyArr = JSON.parse(localStorage.getItem("data"));
    var lastIndex = historyArr.length - 1;
    var btn = $("<button></button>").text(historyArr[lastIndex])
    $('#citybuttons').append(btn);
}

localStorage.getItem('data')

function clearhistory() {
  localStorage.clear();
  $('#citybuttons').html(""); 
}