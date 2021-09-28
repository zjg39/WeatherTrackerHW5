// Weather Variables for Dashboard

var lat;
var lon;
var currentCityTemp;
var currentCityHumidity;
var currentCityWind;
var currentCityUV;
var currentCityName;


// Variables for Five Day Forecast Function

var card = $('.tomorrowCard');


var APIKey = "9ce830acb4690b2eac28a095177620df";

var chosenCity = JSON.parse(localStorage.getItem('searchedCity'));
$('#searchButton').on('click', function(){
    var input = $('#searchBar').val();
    localStorage.setItem('searchedCity', JSON.stringify(input));
    city = input;
    weatherData(city);
})


function storeCity(currentCityName){
    if (cityArray == null) {
        cityArray = [currentCityName];
    } else {
        cityArray.unshift(currentCityName);
    } localStorage.setItem('arrayCity', JSON.stringify(cityArray))
    console.log(cityArray);
    }






// Dashboard display

function pullLatLonData(l){
    lat = l.coord.lat;
    lon = l.coord.lon;
    currentCityName = l.name;
    currentCityTemp = l.main.temp;
    currentCityWind = l.wind.speed;
    currentCityHumidity = l.main.humidity;
    $('.currentCityTitle').text(currentCityName);
    $('#currentTemp').text(currentCityTemp);
    $('#currentWind').text(currentCityWind);
    $('#currentHumidity').text(currentCityHumidity);
    forecastWeatherData(lat, lon);
    storeCity(currentCityName);
}


// UVI for Dashboard 

function uviChange(change){
    // lat = change.lat;
    // lon = change.lon;
    currentCityUV = change.current.uvi;
    console.log(change.daily[0].uvi);
    $('#currentUV').text(currentCityUV);
    fiveDayForecast(change);
}


// 5-Day Forecast Data

function fiveDayForecast(p){
    card.each(function(x){
        var tempHigh = p.daily[x+1].temp.max + ' ºF';
        var tempLow = p.daily[x+1].temp.min + ' ºF';
        var icon = p.daily[x+1].weather[0].icon;
        var iconAddress = 'http://openweathermap.org/img/wn/' + icon + '@2x.png'
        var wind = p.daily[x+1].wind_speed + ' MPH';
        var humidity = p.daily[x+1].humidity + ' %';
        $(this).children().children('.cardTempHigh').text(tempHigh);
        $(this).children().children('.cardTempLow').text(tempLow);
        $(this).children().children('.cardWind').text(wind);
        $(this).children().children('.cardHumidity').text(humidity);
        $(this).children('.cardFavicon').attr('src', iconAddress);
    })
}

// Fetching the data for Latitude and Longitude 

function weatherData(city){
    var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+APIKey+'&units=imperial';
    $.ajax({
        url: weatherUrl,
        method: 'GET'
    }).then(function(Response){
        console.log(Response.coord.lat);
        console.log(Response.coord.lon);
        console.log(Response);
        pullLatLonData(Response);
        fiveDayForecast(Response);
    })
}

// The function to grab the rest of the data

function forecastWeatherData(lat, lon){
    var fullWeatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&exclude-hourly,minutely&appid='+APIKey+'&units=imperial'
    $.ajax({
        url: fullWeatherUrl,
        method: 'GET',
    }).then(function(Response){
        console.log(Response);
        uviChange(Response);
    })
}
