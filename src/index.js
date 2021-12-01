function displayCurrentConditions(response) {
    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector("#current-temperature");
    temperatureElement.innerHTML = `${temperature}°C`;

    let minTemperature = Math.round(response.data.main.temp_min);
    let tempMinElement = document.querySelector("#min-temperature");
    tempMinElement.innerHTML = `${minTemperature}`;

    document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);

    let wind = Math.round(response.data.wind.speed);
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = `${wind}`;

    currentCity.innerHTML = `The current temperature in ${response.data.name} is:`;
}

function displayCurrentCity(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#cityInput");
    let currentCity = document.querySelector("#currentCity");
    currentCity.innerHTML = `The current temperature in ${cityInput.value} is`;

    let apiKey = "b0c8bbe6abc74ddc23b034afa70b96c3";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayCurrentConditions);
}

function searchLocation(position) {
    let apiKey = "b0c8bbe6abc74ddc23b034afa70b96c3";
    let units = "metric";
    let apiUrl =`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayCurrentConditions);
}

function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}


let now = new Date();
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
    hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
}
let currentDate = document.querySelector("#currentDate");
currentDate.innerHTML = `${day} ${hours}:${minutes}`;

let form = document.querySelector("form");
form.addEventListener("submit", displayCurrentCity);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);