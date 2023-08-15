const apiKey = '546e8f7e987d75d99fdf83985d704ad0';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?&units=metric';
const cityName = document.querySelector('.search input');
const button = document.querySelector('.search button');
const weather = document.querySelector('.weather-icon')

async function checkWeather(city){
    const response = await fetch(apiUrl + `&q=${city}` + `&appid=${apiKey}`);
    var data = await response.json();

    if(response.status == 404){
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';
    }
    else{
        console.log(data);

        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.ceil(data.main.temp) + "°C";
        document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
        document.querySelector('.wind').innerHTML = data.wind.speed + ' km/hr';

        if(data.weather[0].main == 'Clouds'){
            weather.src = 'images/clouds.png'
        }
        else if(data.weather[0].main == 'Clear'){
            weather.src = 'images/clear.png'
        }
        else if(data.weather[0].main == 'Rain'){
            weather.src = 'images/rain.png'
        }
        else if(data.weather[0].main == 'Drizzle'){
            weather.src = 'images/mist.png'
        }

        document.querySelector('.weather').style.display = 'block';
        document.querySelector('.error').style.display = 'none';
    }
    
}

button.addEventListener('click', () => {
    checkWeather(cityName.value.toLowerCase())
})

cityName.addEventListener('keydown', keys => {
    if(keys.key === 'Enter'){
        if(cityName.value === '')return
        else{
            checkWeather(cityName.value.toLowerCase());
        }
    }
})
