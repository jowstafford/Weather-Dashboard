var inputButton = document.querySelector("#confirmInput");
var cityInputEl = document.querySelector("#cityInput");
var cityInput = "";
var lat = "";
var lon = "";

var conditionVariables = {
  id: "",
  temp: "",
  wind: "",
  humidity: "",
  UVIndex: "",
  clouds: "",
};

inputButton.addEventListener("click", () => {
  cityCordinates();
  currentPosition();
});

var cityCordinates = (cityInput) => {
  cityInput = cityInputEl.value;
  if (cityInput) {
    var apiSearch =
      "https://api.openweathermap.org/geo/1.0/direct?q=" +
      cityInput +
      "&limit=1&appid=1d74fce1be8d5312d3fcc06f18c3880f";
    fetch(apiSearch).then((response) => {
      response.json().then((data) => {
        lat = data[0].lat;
        lon = data[0].lon;
        weatherFetch(lat, lon);
      });
    });
    cityNameArray.push(cityInput);
    console.log(cityNameArray);
    window.localStorage.setItem("cityName", JSON.stringify(cityNameArray));
  }
};

var cityNameArray = [];
if (window.localStorage.getItem("cityName")) {
  cityNameArray.push(...JSON.parse(window.localStorage.getItem("cityName")));
}

var weatherFetch = (lat, lon) => {
  var latLon =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial&exclude=minutely,hourly,alerts&appid=1d74fce1be8d5312d3fcc06f18c3880f";
  console.log(latLon);

  fetch(latLon).then((response) => {
    response.json().then((data) => {
      console.log(data);
      conditionVariables.id = data.current.weather[0].id;
      conditionVariables.temp = data.current.temp;
      conditionVariables.wind = data.current.wind_speed;
      conditionVariables.humidity = data.current.humidity;
      conditionVariables.UVIndex = data.current.uvi;
      conditionVariables.clouds = data.current.clouds;
      finalWeather();
    });
  });
};

var currentPosition = (cityInput) => {
  cityInput = cityInputEl.value;
  if (cityInput) {
    var apiSearch =
      "https://api.openweathermap.org/geo/1.0/direct?q=" +
      cityInput +
      "&limit=1&appid=1d74fce1be8d5312d3fcc06f18c3880f";
    fetch(apiSearch).then((response) => {
      response.json().then((data) => {
        lat = data[0].lat;
        lon = data[0].lon;
        forecastInfo(lat, lon);
      });
    });
  } else {
    alert("Please Enter City Name");
  }
};

var finalWeather = () => {
  var CityElement = document.querySelector("#inputInfo");
  var CityUVElement = document.createElement("p");
  var CityInputElement = document.createElement("p");
  var CityTempElement = document.createElement("p");
  var CityWindElement = document.createElement("p");
  var CityHumidityElement = document.createElement("p");
  var CityCloudsElement = document.createElement("i");
  CityElement.innerHTML = "";
  CityInputElement.textContent = cityInput;
  CityTempElement.textContent =
    "Temperature: " + conditionVariables.temp + "°F";
  CityWindElement.textContent =
    "Wind Speeds: " + conditionVariables.wind + "MPH";
  CityHumidityElement.textContent =
    "Humidity: " + conditionVariables.humidity + "%";
  CityUVElement.textContent = "UV Index: " + conditionVariables.UVIndex;
  CityElement.appendChild(CityInputElement);
  CityElement.appendChild(CityTempElement);
  CityElement.appendChild(CityWindElement);
  CityElement.appendChild(CityHumidityElement);
  CityElement.appendChild(CityUVElement);

  if (conditionVariables.clouds == 100) {
    CityCloudsElement.classList.add("fa-solid");
    CityCloudsElement.classList.add("fa-cloud");
    CityElement.prepend(CityCloudsElement);
  } else if (
    conditionVariables.clouds >= 50 &&
    conditionVariables.clouds <= 99
  ) {
    CityCloudsElement.classList.add("fa-solid");
    CityCloudsElement.classList.add("fa-cloud-sun");
    CityElement.prepend(CityCloudsElement);
  } else if (
    conditionVariables.clouds >= 0 &&
    conditionVariables.clouds <= 49
  ) {
    CityCloudsElement.classList.add("fa-solid");
    CityCloudsElement.classList.add("fa-sun");
    CityElement.prepend(CityCloudsElement);
  }
};

var parseWeather = (weatherElement) => {
  var weatherJSON = JSON.parse(weatherElement);
  var dailyForecast = weatherJSON.daily;
  document.getElementById("forecastInfo").innerHTML = "";
  for (x = 1; x < dailyForecast.length; x++) {
    var day = dailyForecast[x];
    var today = new Date().getDay() + x;
    if (today > 6) {
      today = today - 7;
    }
    var Weekdays = WeekdayList(today);
    var highTemperature = trueTemp(day.temp.max);
    var lowTemperature = trueTemp(day.temp.min);
    var humidity = day.humidity;
    var windSpeed = day.wind_speed;
    var windGust = day.wind_gust;
    var UVIndex = day.uvi;
    displayWeatherDay(
      highTemperature,
      lowTemperature,
      windSpeed,
      Weekdays,
      humidity,
      windGust,
      UVIndex
    );
  }
};
