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