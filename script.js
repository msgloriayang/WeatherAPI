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