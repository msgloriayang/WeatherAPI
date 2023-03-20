var APIKey = "eb253f48b78c5f91d425a9840bd0d476";
var city = "Minneapolis";

fetch("https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}")
  .then(response => response.json())
  .then(data => {
    const temp = Math.round(data.main.temp - 273.15);
    const condition = data.weather[0].description;
    const location = data.name;
    const weatherDiv = document.getElementById("weather");
    weatherDiv.innerHTML = `The temperature in ${location} is ${temp}&deg;C with ${condition}.`;
  })
  .catch(error => console.log(error));