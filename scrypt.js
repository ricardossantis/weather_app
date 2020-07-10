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
let newWeather;
let newWind;
let newDescriptionWea;

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
    let img = document.querySelector(".img");
    img.style.visibility = "visible";
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=1f5698277f2f1f65012e89c68b3d08a4`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        weather = data.main;
        wind = data.wind;
        descriptionWea = data.weather[0].description;
    })
    .then(() => displayCurent(city, weather, wind, descriptionWea))
    .then(() => img.style.visibility = "hidden");
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

function getWeatherNewLocation() {
    let newLocation = document.getElementById("input").value;
    newLocation = newLocation.capitalize();  

    let img = document.querySelector(".img");
    img.style.visibility = "visible";

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${newLocation}&APPID=1f5698277f2f1f65012e89c68b3d08a4`)
    .then(response => {
        if(response.ok){
            response.json()
            .then(data => {
                console.log(data)
                newWeather = data.main;
                newWind = data.wind;
                newDescriptionWea = data.weather[0].description;
            })
            .then(() => displayNew(newLocation, newWeather, newWind, newDescriptionWea))
            .then(() => img.style.visibility = "hidden");
        }else {
            img.style.visibility = "hidden";
            displayNew("Don't exist, type again");
            
        }
    })
}

function displayNew(city, weather, wind, descriptionWea){
    console.log(weather, wind, descriptionWea);
    let newLocation = document.querySelector("#locationRig");
    newLocation.innerHTML = `The selected location is: ${city}`

    let newTempCur = document.querySelector("#tempCurRig");
    newTempCur.innerHTML = `Current temperature: ${weather.temp.toCelsius()}°`;

    let newTempFeel = document.querySelector("#tempFeelRig");
    newTempFeel.innerHTML = `Feels like: ${weather.feels_like.toCelsius()}°`;

    let newWindSpd = document.querySelector("#windSpdRig");
    newWindSpd.innerHTML = `Wind speed is: ${wind.speed}m/s`;

    let newHumidity = document.querySelector("#humidityRig");
    newHumidity.innerHTML = `Humidity is: ${weather.humidity}%`

    let newDescription = document.querySelector("#descriptionRig");
    newDescription.innerHTML = `We can see a ${descriptionWea}`;
}

let button = document.getElementById("button");
button.addEventListener('click', () => getWeatherNewLocation());

Object.prototype.toCelsius = function(){
    cel = this - 273.15;
    return cel.toFixed(2);
}

String.prototype.capitalize = function() {
    return this.split(" ").map(el => el.charAt(0).toUpperCase() + el.slice(1)).join(" ");
  }



