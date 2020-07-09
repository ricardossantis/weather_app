let date = new Date();
date = date.toDateString()

let dateHtml = document.querySelector(".date");
dateHtml.innerHTML = date;

let city;
let weather;

function getCity(){
    fetch('http://api.ipstack.com/check?access_key=b0b877152a35fa48b8f313900f6bb8e8')
    .then(response => response.json())
    .then(data => {
        console.log(data, data.city)
        city = data.city;
    });
}

function getWeather(city){
    console.log(city);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=1f5698277f2f1f65012e89c68b3d08a4`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        weather = data.main;
    });
}

function displayWeather(){

}

Object.prototype.toCelsius = function(){
    cel = this - 273.15;
    return cel
}

function main(){
    getCity();
    setTimeout(() => getWeather(city), 600);
}
kel = 290;
console.log(kel.toCelsius());

main();
