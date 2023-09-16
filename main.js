// Function to fetch weather data for a given location
function getWeatherData(location) {
    const apiKey = '16e1b7f894186c09971dcb604e7c8d34';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

    return fetch(apiUrl, { mode: 'cors' })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response failed');
            }
            return response.json();
        })
        .then((data) => {
            return processWeatherData(data);
        })
        .catch((err) => {
            console.error('Error', err);
            throw err;
        });
}

// Function to process the weather data and return an object with required information
function processWeatherData(data) {
    if (!data) {
        return null;
    }

    const weatherInfo = {
        location: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
    };

    return weatherInfo;
}

// Handle form submission
const weatherForm = document.getElementById('weatherForm');
const weatherInfoDiv = document.getElementById('weatherInfo');

weatherForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    const locationInput = document.getElementById('locationInput');
    const location = locationInput.value;

    if (location) {
        getWeatherData(location)
            .then((weatherInfo) => {
                if (weatherInfo) {
                    // Display weather information in the div
                    weatherInfoDiv.textContent = `Location: ${weatherInfo.location}, Temperature: ${weatherInfo.temperature}°C, Description: ${weatherInfo.description}, Humidity: ${weatherInfo.humidity}%, Wind Speed: ${weatherInfo.windSpeed} m/s`;
                } else {
                    weatherInfoDiv.textContent = 'Weather data not available.';
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                weatherInfoDiv.textContent = 'An error occurred while fetching weather data.';
            });
    } else {
        weatherInfoDiv.textContent = 'Please enter a location.';
    }
});
