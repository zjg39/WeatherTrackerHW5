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
var cityArray = [];
var APIKey = "9ce830acb4690b2eac28a095177620df";

var chosenCity = JSON.parse(localStorage.getItem('searchedCity'));
$('#searchButton').on('click', function(){
    var input = $('#searchBar').val();
    localStorage.setItem('searchedCity', JSON.stringify(input));
    city = input;
    weatherData(city);
    limitList();
})

// Init Function to hide Dashboard
// function Init(){
//     document.querySelector('#dashboard').style.display = 'none';
// }

function storeCity(currentCityName){
    cityArray = JSON.parse(localStorage.getItem('storedCities'))
    if (cityArray == null) {
        cityArray = [currentCityName];
    } else {
        cityArray.unshift(currentCityName);
    } localStorage.setItem('storedCities', JSON.stringify(cityArray))
    console.log(cityArray);
}

function limitList(){
    cityArray = JSON.parse(localStorage.getItem('storedCities'));
    if (cityArray != null){
        if (cityArray.length >= 8){
            cityArray.pop()
        }
    }

        var storedCities = JSON.parse(localStorage.getItem('storedCities'))
        for (i = 0; i < storedCities.length; i++){
            // var searchedList = $('#cityList');
            var searchedButtons = document.createElement('button');
            searchedButtons.setAttribute('data-previous', storedCities[i])
            searchedButtons.innerHTML = storedCities[i];
            document.querySelector('#cityList').append(searchedButtons);
            searchedButtons.on('click', function(){
                
            });
            }
        

// function createButton(){
    console.log("was clicked")
    document.createElement('button').classList.add('previousSearches');
    document.querySelector('#cityList').append(searchedButtons);
    $('.previousSearches').on('click', function(event){
        event.target.textContent();
        var city = event.target;
        console.log(city);
    })
// }
}
// Dashboard display

function pullLatLonData(l){
    lat = l.coord.lat;
    lon = l.coord.lon;
    currentCityName = l.name;
    currentCityTemp = l.main.temp;
    currentCityWind = l.wind.speed;
    currentCityHumidity = l.main.humidity;
    // var dateNowTitle = moment.unix(l.daily[0].dt).format('MM/DD/YYYY');
    // var unixDate = l.dt;
    // var dateObject = new Date(unixDate*1000);
    // var date = dateObject.toLocaleDateString();
    $('.currentCityTitle').text(currentCityName);
    $('#currentTemp').text(currentCityTemp);
    $('#currentWind').text(currentCityWind);
    $('#currentHumidity').text(currentCityHumidity);
    // $('#date').text(date);
    forecastWeatherData(lat, lon);
    storeCity(currentCityName);
    // $('.titleDate').text(dateNowTitle);
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
        var dateNow = moment.unix(p.daily[x+1].dt).format('MM/DD/YYYY');
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
        $(this).children('.cardDate').text(dateNow);
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
