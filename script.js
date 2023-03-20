var APIKey = "eb253f48b78c5f91d425a9840bd0d476";
var city = ["Minneapolis", "Duluth", "Maple Grove"];

fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey)
  .then(response => response.json())
  .then(data => console.log(data));
