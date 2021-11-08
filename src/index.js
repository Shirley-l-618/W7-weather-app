function formatDate(timestamp) {
  let date = new Date(timestamp);
  console.log(date);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return day;
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `        
        <div class="col-2 forecast-preview">
          <div class="forecast-time">${formatDay(forecastDay.dt)}</div>
          <img src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" alt="Clear" id="small-icon"/ width="60px">
          <div class="forecast-temp"><span class="upper">${Math.round(
            forecastDay.temp.max
          )}°</span> <span class="lower">${Math.round(
          forecastDay.temp.min
        )}°</span></div>
        </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayForecast1(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `        
        <div class="col-2 forecast-preview">
          <div class="forecast-time">${formatDay(forecastDay.dt)}</div>
          <img src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" alt="Clear" id="small-icon"/ width="60px">
          <div class="forecast-temp"><span class="upper">${Math.round(
            forecastDay.temp.max
          )}°</span> <span class="lower">${Math.round(
          forecastDay.temp.min
        )}°</span></div>
        </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "470aa4dfed6e145bca75f0a10f3f646f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function getForecast1(coordinates) {
  let apiKey = "470aa4dfed6e145bca75f0a10f3f646f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast1);
}

function showTemperature(response) {
  console.log(response);
  let searchInput = document.querySelector("#search-input");
  let citysearch = document.querySelector(".city-name");
  citysearch.innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  coord = response.data.coord;
  let temperature = Math.round(celsiusTemperature);
  let tempElement = document.querySelector(".temp");
  tempElement.innerHTML = `${temperature}`;
  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector(".wind");
  windElement.innerHTML = `${wind}`;
  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector(".humidity");
  humidityElement.innerHTML = `${humidity}`;
  let description = response.data.weather[0].description;
  let descriptionElement = document.querySelector(".description");
  descriptionElement.innerHTML = `${description}`;
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let largeIcon = response.data.weather[0].icon;
  let largIconElement = document.querySelector("#large-icon");
  largIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${largeIcon}@2x.png`
  );
  getForecast(coord);
}

function citySearch(name) {
  let apiKey = "470aa4dfed6e145bca75f0a10f3f646f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-input");
  citySearch(cityInputElement.value);
}

function showCelsius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(celsiusTemperature);
  getForecast(coord);
}

let celsiusTemperature = null;
let coord = null;

let searchform = document.querySelector("#search-form");
searchform.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);

citySearch("Roseville");
