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
        console.log('Weather data:',data);
      })
      .catch((err) => {
        console.error('Error', err);
      });
}

getWeatherData('Nairobi');