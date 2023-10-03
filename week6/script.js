document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "8f5908f7f657428e9b535639230310";
    const weatherInfo = document.getElementById("weather-info");
    const searchButton = document.getElementById("search");

    searchButton.addEventListener("click", () => {
        const locationInput = document.getElementById("location").value;
        if (locationInput === "") {
            alert("Please enter a location.");
            return;
        }

        const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${locationInput}`;

        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                const { location, current } = data;
                const weatherHtml = `
                    <h2>Weather in ${location.name}, ${location.country}</h2>
                    <p>Temperature: ${current.temp_c}°C</p>
                    <p>Condition: ${current.condition.text}</p>
                `;
                weatherInfo.innerHTML = weatherHtml;
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                weatherInfo.innerHTML = "<p>Unable to fetch weather data.</p>";
            });
    });
});
