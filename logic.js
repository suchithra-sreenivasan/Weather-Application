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
            let background_img = '';

            // Set weather icon and background image based on weather condition
            if(main == 'Clouds'){
                weather_img = 'images/clouds.png';
                background_img = 'url(images/clouds.gif)'; // Cloudy background
            }
            else if(main == 'Clear'){
                weather_img = 'images/Clear.png';
                background_img = 'url(images/clear-sky.gif)'; // Clear sky background
            }
            else if(main == 'Rain'){
                weather_img = 'images/rain.png';
                background_img = 'url(images/rain.gif)'; // Rainy background
            }
            else if(main == 'Drizzle'){
                weather_img = 'images/drizzle.png';
                background_img = 'url(images/drizzle.gif)'; // Drizzle background
            }
            else if(main == 'Mist'){
                weather_img = 'images/mist.png';
                background_img = 'url(images/mist.gif)'; // Mist background
            }
            else if(main == 'Fog'){
                weather_img = 'images/mist.png';
                background_img = 'url(images/fog.gif)'; // Mist background
            }
            else{
                weather_img = 'images/clouds.png';
                background_img = 'url(images/normal.gif)'; // Default background
            }

            // Apply the background image to the body
            document.body.style.backgroundImage = background_img;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundRepeat = 'no-repeat';

            // Display weather details
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
