async function fetchWeatherData() {
  const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Bengaluru&units=imperial&appid=3cb03b517e26c5c370402011f5438cbf');
  if (response.ok) {
    const data = await response.json();
    const { temp, temp_min, temp_max } = data.main;
    return {
      currentTemp: temp,
      minTemp: temp_min,
      maxTemp: temp_max,
    };
  }
  return null;
}

export default async function decorate(block) {
  // Extract data from block HTML
  const title = block.querySelector('strong').textContent;
  const heading = block.querySelector('h2').textContent;
  const description = block.querySelector('p:nth-of-type(2)').textContent;
  
  // Extract image URL from block HTML
  const imageUrl = block.querySelector('img').src;

  // Fetch weather data
  const weatherData = await fetchWeatherData();

  // Replace block inner HTML with structured HTML
  block.innerHTML = `
    <div class="banner" style="background-image: url('${imageUrl}');">
      <div class="content">
        <h3>${title}</h3>
        <h1>${heading}</h1>
        <p>${description}</p>
      </div>
      <div class="temperature-info" aria-label="Temperature Information">
        <p>Current Temp: ${weatherData ? weatherData.currentTemp : 'N/A'}°F</p>
        <p>Min Temp: ${weatherData ? weatherData.minTemp : 'N/A'}°F</p>
        <p>Max Temp: ${weatherData ? weatherData.maxTemp : 'N/A'}°F</p>
      </div>
    </div>
  `;
}
