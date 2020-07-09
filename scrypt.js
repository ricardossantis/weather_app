let date = new Date();
date = date.toDateString()

let dateHtml = document.querySelector(".date");
dateHtml.innerHTML = date;

let city;
let lat;
let lon;
let weather;

function getCity(){
    fetch('http://api.ipstack.com/check?access_key=b0b877152a35fa48b8f313900f6bb8e8')
    .then(response => response.json())
    .then(data => {
        console.log(data, data.city)
        city = data.city;
        lat = data.latitude;
        lon = data.longitude;
    });
}

function getWeather(city, lat , lon){
    console.log(city);
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=1f5698277f2f1f65012e89c68b3d08a4`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        weather = data.main;
    });
}

function displayCurent(city, weather){
    console.log(weather);
    let location = document.querySelector("#locationLef");
    location.innerHTML = `Your location is: ${city}`

    let tempCur = document.querySelector("#tempCurLef");
    tempCur.innerHTML = `Current temperature: ${weather.temp.toCelsius()}°`;

    let tempFeel = document.querySelector("#tempFeelLef");
    tempFeel.innerHTML = `Feels like: ${weather.feels_like.toCelsius()}°`;

    let tempMin = document.querySelector("#tempMinLef");
    tempMin.innerHTML = `Min temperature is: ${weather.temp_min.toCelsius()}°`;

    let tempMax = document.querySelector("#tempMaxLef");
    tempMax.innerHTML = `Min temperature is: ${weather.temp_max.toCelsius()}°`;

    let humidity = document.querySelector("#humidityLef");
    humidity.innerHTML = `Humidity is: ${weather.humidity}%`
}

Object.prototype.toCelsius = function(){
    cel = this - 273.15;
    return cel.toFixed(2);
}

function main(){
    getCity();
    setTimeout(() => getWeather(city, lat, lon), 800);
    setTimeout(() => displayCurent(city, weather), 2200);
}

main();
