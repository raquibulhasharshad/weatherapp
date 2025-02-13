function checkweather(){
    const apikey = "fc32365c9806893ad0d4f5c3104f0fcc";
    const city = document.getElementById("city").value;
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    if (city == ""){
        alert("Please enter the city name");
        return;
    }

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                let weatherCondition = data.weather[0].main.toLowerCase(); 
                let cloudImage = "";
                if (weatherCondition === "clear") {
                    cloudImage = "/clear-sky.png";
                } else if (weatherCondition === "clouds") {
                    cloudImage = "/cloudy.png";
                } else if (weatherCondition === "haze") {
                    cloudImage = "/haze.png";
                } else if (weatherCondition === "rain") {
                    cloudImage = "/rain.png";
                } else if (weatherCondition === "thunderstorm") {
                    cloudImage = "/thunderstorm.png";
                } else if (weatherCondition === "snow") {
                    cloudImage = "/snow.png";
                } else if (weatherCondition === "mist") {
                    cloudImage = "/mist.png";
                } else {
                    cloudImage = "/weather-icon.webp"; 
                }

                document.getElementById("weather-info").innerHTML =
                `<div class="weather-logo">
                    <img id="cloud-image" src="${cloudImage}" alt="Weather Image">
                </div>
                <div class="temperature">${(data.main.temp - 273.15).toFixed(2)}°c</div>
                <div class="location">${data.name}, ${data.sys.country}</div>
                <div class="description">${data.weather[0].description}</div>
                <div class="humidity"> ${data.main.humidity}%</div>
                <div class="humidity-label">Humidity</div>
                <div class="wind"> ${data.wind.speed}km/h</div>
                <div class="wind-label">Wind Speed</div>
                <div class="humidity-logo">
                    <img src="/humidity.png">
                </div>
                <div class="wind-logo">
                    <img src="/wind.png">
                </div>`;
                
            }
            else {
                document.getElementById("weather-info").innerHTML = `<p>City Not Found!!</p>`;
            }
        })
        .catch(error => {
            console.log("Error:", error);
            document.getElementById("weather-info").innerHTML = `<p>Something went wrong!</p>`;
        });

}

const searchbtn = document.querySelector(".search");
searchbtn.addEventListener("click", () => {
    checkweather();
});