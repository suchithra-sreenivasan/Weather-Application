async function search() {
    console.log(city_name.value);
    const api_key = '5fe36b192ffd1c36dffb6752bc1722b2';
    
    if (city_name.value) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name.value}&appid=${api_key}`);
        console.log(response);

        response.json().then((data) => {
            console.log(data);

            const cname = data.name;
            const country = data.sys.country;
            const humidity = data.main.humidity; 
            const wind_speed = (data.wind.speed * 3.6).toFixed(2); 
            const pressure = data.main.pressure; 
            const temp = (data.main.temp - 273.15).toFixed(2); 
            const feels_like = (data.main.feels_like - 273.15).toFixed(2); 
            const main = data.weather[0].main;
            const time_zone = data.timezone;
            
            let weather_img = '';

            if(data.weather[0].main == 'Clouds'){
                weather_img = 'images/clouds.png';
            }
            else if(data.weather[0].main == 'Clear'){
                weather_img = 'images/Clear.png';
            }
            else if(data.weather[0].main == 'Rain'){
                weather_img = 'images/rain.png';
            }
            else if(data.weather[0].main == 'Drizzle'){
                weather_img = 'images/drizzle.png';
            }
            else if(data.weather[0].main == 'Mist'){
                weather_img = 'images/mist.png';
            }

            city_details.innerHTML = `
            <div class="weather-icon mb-4">
                    <img src="${weather_img}" alt="Weather Icon" class="img-fluid">
                </div>
                <h1 class="display-2">${temp}°c</h1>
                <p class="weather-description">${main}</p>
                <p class="location">${cname} , ${country}</p>
                <p class="timezone"><img src="./images/timer.png" alt="Humidity" class="icon mb-2">Time Zone : ${time_zone}</p>
                <div class="extra-info d-flex justify-content-around mt-4">
                    <div class="humidity">
                        <img src="./images/humidity.png" alt="Humidity" class="icon mb-2">
                        <p>${humidity}%<br>Humidity</p>
                    </div>
                    <div class="wind-speed">
                        <img src="./images/wind-speed.png" alt="Wind Speed" class="icon mb-2">
                        <p>${wind_speed} Km/h<br>Wind Speed</p>
                    </div>
                    <div class="pressure">
                        <img src="./images/pressure.png" alt="Humidity" class="icon mb-2">
                        <p>${pressure}%<br>Pressure</p>
                    </div>
                    <div class="feels-like">
                        <img src="./images/feels-like.png" alt="Wind Speed" class="icon mb-2">
                        <p>${feels_like} Km/h<br>Feels Like</p>
                    </div>
                </div>`;
        });
    } else {
        alert('Please fill the form');
    }
}
