const apiKey = "b0504594617283365d201d444ae43014"; 

document.getElementById('getWeatherBtn').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    if (!city) return alert('Please enter a city');

    localStorage.setItem('lastCity', city); // extra credit

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                alert('City not found');
                document.getElementById('weatherResult').innerHTML = '';
                return;
            }
            const weatherHTML = `
                <h2>${data.name}</h2>
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">
                <p>${data.weather[0].description}</p>
                <p>Temperature: ${data.main.temp} °F</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind: ${data.wind.speed} mph</p>
            `;
            document.getElementById('weatherResult').innerHTML = weatherHTML;
        })
        .catch(() => {
            alert('Network error or city not found');
            document.getElementById('weatherResult').innerHTML = '';
        });
});

// Auto-load last city
window.addEventListener('load', () => {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
        document.getElementById('cityInput').value = lastCity;
        document.getElementById('getWeatherBtn').click();
    }
});