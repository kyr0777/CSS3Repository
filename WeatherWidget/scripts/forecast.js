const apiKey = "b0504594617283365d201d444ae43014"; 

document.getElementById('getForecastBtn').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    if (!city) return alert('Please enter a city');

    localStorage.setItem('lastCity', city); // extra credit

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const forecastContainer = document.getElementById('forecastContainer');
            forecastContainer.innerHTML = '';

            // Check for API error
            if (data.cod !== "200") {
                alert('City not found');
                return;
            }

            // group forecast every 24 hours (API gives every 3 hours)
            const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0,5);

            dailyForecasts.forEach(day => {
                const date = new Date(day.dt_txt).toLocaleDateString();
                const forecastHTML = `
                    <div class="forecast-day">
                        <h3>${date}</h3>
                        <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="Weather Icon">
                        <p>${day.weather[0].description}</p>
                        <p>Temp: ${day.main.temp} °F</p>
                        <p>Humidity: ${day.main.humidity}%</p>
                    </div>
                `;
                forecastContainer.innerHTML += forecastHTML;
            });
        })
        .catch(() => alert('Network error or city not found'));
});

// Auto-load last city
window.addEventListener('load', () => {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
        document.getElementById('cityInput').value = lastCity;
        document.getElementById('getForecastBtn').click();
    }
});