//function to fetch the weather data for a given location
function getWeatherData(location){
    const apiKey = '16e1b7f894186c09971dcb604e7c8d34';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

    fetch(apiUrl, {mode:"cors",})
      .then((response) =>{
        if(!response.ok){
            throw new Error('Network response failed');
        }
        return response.json();
      })
      .then((data) =>{
        return processWeatherData(data);
      })
      .then((data) =>{
        console.log('Weather data:',data);
      })
      .catch((err) => {
        console.error('Error', err);
      });
}

// Function to process the weather data and return an object with required information
function processWeatherData(data) {
    if (!data) {
        return null;
    }

    // Extract the relevant data from the API response
    const weatherInfo = {
        location: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
    };

    return weatherInfo;
}

getWeatherData('New York')
    .then((weatherInfo) => {
        if (weatherInfo) {
            console.log('Processed Weather Data:', weatherInfo);
            // You can use the processed data for your app here
        } else {
            console.log('Weather data not available.');
        }
    });