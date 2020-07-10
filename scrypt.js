let date = new Date();
date = date.toDateString()

let dateHtml = document.querySelector(".date");
dateHtml.innerHTML = date;

let city;
let lat;
let lon;
let win;
let descriptionWea;
let weather;

function getCity(){
    fetch('https://ipapi.co/json/')
    .then(response => response.json())
    .then(data => {
        console.log(data, data.city)
        city = data.city;
        lat = data.latitude;
        lon = data.longitude;
    })
    .then(() => getWeather(city, lat, lon));
}

getCity();

function getWeather(city, lat , lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=1f5698277f2f1f65012e89c68b3d08a4`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        weather = data.main;
        wind = data.wind;
        descriptionWea = data.weather[0].description;
    })
    .then(() => displayCurent(city, weather, wind, descriptionWea));
}

function displayCurent(city, weather, wind, descriptionWea){
    console.log(weather, wind, descriptionWea);
    let location = document.querySelector("#locationLef");
    location.innerHTML = `Your location is: ${city}`

    let tempCur = document.querySelector("#tempCurLef");
    tempCur.innerHTML = `Current temperature: ${weather.temp.toCelsius()}°`;

    let tempFeel = document.querySelector("#tempFeelLef");
    tempFeel.innerHTML = `Feels like: ${weather.feels_like.toCelsius()}°`;

    let windSpd = document.querySelector("#windSpdLef");
    windSpd.innerHTML = `Wind speed is: ${wind.speed}m/s`;

    let humidity = document.querySelector("#humidityLef");
    humidity.innerHTML = `Humidity is: ${weather.humidity}%`

    let description = document.querySelector("#descriptionLef");
    description.innerHTML = `We can see a ${descriptionWea}`;
}

Object.prototype.toCelsius = function(){
    cel = this - 273.15;
    return cel.toFixed(2);
}

String.prototype.capitalize = function() {
    return this.split(" ").map(el => el.charAt(0).toUpperCase() + el.slice(1)).join(" ");
  }



