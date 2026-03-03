const apiKey = "4f395f2b54404fc880ce4e6fefc88b3d";

document.addEventListener("DOMContentLoaded", function () {

    const searchBtn = document.getElementById("searchBtn");
    const cityInput = document.getElementById("cityInput");

    searchBtn.addEventListener("click", getWeather);

    cityInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            getWeather();
        }
    });

    function getWeather() {

        const city = cityInput.value.trim();

        if (city === "") {
            alert("Please enter a city name");
            return;
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("City not found");
                }
                return response.json();
            })
            .then(data => {

                document.getElementById("cityName").innerText = data.name;
                document.getElementById("temperature").innerText =
                    `Temperature: ${data.main.temp}°C`;

                document.getElementById("description").innerText =
                    `Condition: ${data.weather[0].description}`;

                document.getElementById("humidity").innerText =
                    `Humidity: ${data.main.humidity}%`;
            })
            .catch(error => {
                alert(error.message);
            });
    }

});