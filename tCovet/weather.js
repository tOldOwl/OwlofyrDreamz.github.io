fetch("https://api.open-meteo.com/v1/forecast?latitude=34.39&longitude=-118.57&current=temperature_2m,weather_code")
    .then(response => response.json())
    .then(data => {
        document.getElementById("weather-report").innerHTML =
            "Temperature: " + data.current.temperature_2m + "°F";
    })
    .catch(error => {
        document.getElementById("weather-report").innerHTML =
            "Weather unavailable";
    });

window.onload = function() {

    var weatherDiv = document.getElementById("weather-report");

    weatherDiv.innerHTML =
        "<p>72°F</p>" +
        "<p>Sunny</p>";

};