var apiKey = `eb253f48b78c5f91d425a9840bd0d476`;
var searchForm = document.querySelector("form");
var cityInput = document.querySelector("#city-input");
var searchHistory = document.querySelector('#search-history');

// this is to retrieve the weather and have it show on index.html
function getWeather(city) {
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    const temp = Math.round(data.main.temp - 273.15);
    const location = data.name;
    const windSpeed = data.wind.speed;
    const humidity = data.main.humidity;
    const weatherDiv = document.getElementById("weather");
    const currentDate = new Date();
    const dateOptions = { month: 'numeric', day: 'numeric', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', dateOptions);
    weatherDiv.innerHTML = `${location} (${formattedDate})<br><br>Temp: ${temp}&deg;C<br><br> Wind: ${windSpeed} MPH<br><br> Humidity: ${humidity}%`;
})
  .catch(error => console.log(error));
}

// this is to retrieve weather 5-day forecast
function getForecast(city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
    const forecastDiv = document.getElementById("forecast");
    forecastDiv.innerHTML = "";
    data.list.forEach(forecastData => {
      const forecastList = data.list;
      const formattedDate = { month: 'numeric', day: 'numeric', year: 'numeric' };
      const iconCode = forecastData.weather[0].icon;
      const temp = Math.round(forecastData.main.temp - 273.15);
      const windSpeed = forecastData.wind.speed;
      const humidity = forecastData.main.humidity;
      const forecastItem = `
      <div class="forecast-item">
      <div>${forecastList}</div>
        <div>${formattedDate.toLocaleDateString()}</div>
        <img src="https://openweathermap.org/img/w/${iconCode}.png">
        <div>Temp: ${temp}&deg;C</div>
        <div>Wind: ${windSpeed} m/s</div>
        <div>Humidity: ${humidity}%</div>
      </div>
    `;
    forecastDiv.innerHTML += forecastItem;
  })
.catch(error => console.log(error));
})

// this is where users can search for a city
searchForm.addEventListener("submit", event => {
    event.preventDefault();
    const city = cityInput.value.trim();
    getWeather(city);
  });

//   this is to enable search history to show up in html
  function saveSearchHistory(city) {
    let searchHistory = localStorage.getItem("searchHistory");
    if (!searchHistory) {
      searchHistory = [];
    } else {
        searchHistory = JSON.parse(searchHistory);
    }
    searchHistory.push(city);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }
  
  function loadSearchHistory() {
    let searchHistory = localStorage.getItem("searchHistory");
    if (searchHistory) {
      searchHistory = JSON.parse(searchHistory);
      const searchHistoryList = document.querySelector("#search-history");
      for (const city of searchHistory) {
        const li = document.createElement("li");
        li.textContent = city;
        searchHistoryList.appendChild(li);
      }
    }
  }
  
  loadSearchHistory();
}