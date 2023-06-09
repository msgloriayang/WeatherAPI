var apiKey = `eb253f48b78c5f91d425a9840bd0d476`;
var searchForm = document.querySelector("form");
var cityInput = document.querySelector("#city-input");
var searchHistory = document.querySelector("searchHistory");

var listOfCities = [];
if(localStorage.getItem("history")) {
    listOfCities = JSON.parse(localStorage.getItem("history"))
}

function getCords(city) {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        const lat = data[0].lat;
        const lon = data[0].lon;
        getWeather(city, lat, lon);
        getForecast(city, lat, lon);
      }) 
    .catch(error => console.log(error));
  }

function getWeather(city, lat, lon) {
fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
.then(response => response.json())
  .then(data => {
    console.log(data);
    const temp = Math.round(data.main.temp - 273.15);
    const location = data.name;
    const windSpeed = data.wind.speed;
    const humidity = data.main.humidity;
    const currentDate = new Date();
    const dateOptions = { month: 'numeric', day: 'numeric', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', dateOptions);
    const weatherDiv = document.getElementById("weather");
      weatherDiv.innerHTML = `<h1>${location} (${formattedDate})</h1><br>
      Temp: ${temp}&deg;C<br><br>
      Wind: ${windSpeed} MPH<br><br>
      Humidity: ${humidity}%`
})
  .catch(error => console.log(error));
}

function getForecast(city, lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    let currentDate = new Date(data.list[0].dt_txt);
    const forecastDiv = document.getElementById("forecast");
    forecastDiv.innerHTML = "";
    for (let i = 0; i < 5; i++) {
      const forecastData = data.list[i];
      const dateOptions = { month: 'numeric', day: 'numeric', year: 'numeric' };
      const formattedDate = currentDate.toLocaleDateString('en-US', dateOptions);
      const iconCode = forecastData.weather[0].icon;
      const temp = Math.round(forecastData.main.temp - 273.15);
      const windSpeed = forecastData.wind.speed;
      const humidity = forecastData.main.humidity;
      forecastDiv.innerHTML += `
        <div>
          <h4>${formattedDate}</h4>
          <img src="https://openweathermap.org/img/w/${iconCode}.png"><br>
          <p>Temp: ${temp}&deg;C</p><br>
          <p>Wind: ${windSpeed} MPH</p><br>
          <p>Humidity: ${humidity}%</p>
        </div>
      `;
      currentDate.setDate(currentDate.getDate() + 1); // Increment the date by one day
    }
  })
  .catch(error => console.log(error));
}

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
      for (const city of searchHistory) {
        const li = document.createElement("li");
        li.textContent = city;
        searchHistory = document.querySelector("#searchHistory").appendChild(li);
} 
} 
} 
  loadSearchHistory();

searchForm.addEventListener("submit", event => {
    event.preventDefault();
    const city = cityInput.value.trim();
    getCords(city);

  const li = document.createElement("li");
  li.textContent = city;
  
  let searchHistory = localStorage.getItem("searchHistory");
  if (searchHistory) {
    searchHistory = JSON.parse(searchHistory);
    searchHistory.push(city);
  } else {
    searchHistory = [city];
  }
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
});