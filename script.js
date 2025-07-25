/* API Retrieval & Processing */
async function getWeather(location) {
    const baseUrl = 'https://visual-crossing-weather.p.rapidapi.com/forecast';
    const params = new URLSearchParams({
        contentType: 'json',
        unitGroup: 'us',
        aggregateHours: '24',
        location: location,
        shortColumnNames: 'false'
    })

    const url = `${baseUrl}?${params.toString()}`;

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '171ce84a73msh3d9e1ebc56f3cd9p147618jsna50a70d21f70',
            'x-rapidapi-host': 'visual-crossing-weather.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}


function processData(result, location){
    let data = result.locations;
    let processedData = [];
    let days = data[location]?.values;

    if (!days){
        console.error("No values present");
        return;
    }

    days.forEach(day => {
        processedData.push({date: day.datetimeStr, UV: day.uvindex, min_temp: day.mint, max_temp: day.maxt, avg_temp: day.temp, precip: day.precip, humidity: day.humidity, conditions: day.conditions});
    });

    return processedData;
}


/* Location Dropdown */
const locationDropdown = document.getElementById('location-dropdown');
let selectedLocation = locationDropdown.value;


locationDropdown.addEventListener('change', () => {
    selectedLocation = locationDropdown.value;
  });

(async () => {
    const weatherData = await getWeather(selectedLocation);
    const processed = processData(weatherData, selectedLocation);
    console.log(processed);
})();

