// JS for WeatherTrackerHW5

var APIKey = "0e433a518a861211a71db90fce0c7d3d";

var chosenCity = JSON.parse(localStorage.getItem('searchedCity'));
// localStorage.setItem('searchedCity', JSON.stringify(input));
$('#searchButton').on('click', function(){
    var input = $('#searchBar').val();
    city = input;
    weatherData(city);
})

// Displaying the cities for the user

var cityArray = [];

function showCities(){
    $('#cityList').empty();
    if (cityArray != null){
        while (cityArray.length > 10){
            chosenCity = JSON.parse(localStorage.getItem('cityListItem'))
            cityArray.pop();
            localStorage.setItem('cityListItem', JSON.stringify(chosenCity))
        }
    } if (cityArray == null){
        
    }
}

// Weather Variables


var maxTemp;
var minTemp;
var windSpeed;
var humidity;
var uvi;
var lat;
var lon;


function weatherData(city){
    var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid-'+APIKey+'&units=imperial'
    fetch(weatherUrl , {
        method: 'GET',
        credentials: 'omit',
        redirect: 'error'
    })
    .then(Response => Response.json())
    .then(data => console.log(data))
}

function forecastWeatherData(){
    var fullWeatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&exclude-hourly,minutely&appid='+APIKey+'&units=imperial'
    fetch(fullWeatherUrl , {
        method: 'GET',
        credentials: 'omit',
        redirect: 'error'
    })
    .then(Response => Response.json())
    .then(data => console.log(data))
}
