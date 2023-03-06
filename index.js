const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () =>{
    const lat = document.querySelector('.search-box #lat').value;
    const long = document.querySelector('.search-box #long').value;
    if(lat === '' || long === '')
        return;
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,relativehumidity_2m,weathercode,windspeed_10m&timezone=auto`)
    .then(response => response.json()) 
    .then( json =>{
        if(json.cod === '404'){
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            return;
        }
        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');
        const weather_code = json['hourly']['weathercode'][0];
        const temp_values = json['hourly']['temperature_2m'];
        const humidity_values = json['hourly']['relativehumidity_2m'];
        const wind_values = json['hourly']['windspeed_10m'];
        function prom(list){
            var aux=0
            for (var x=0; x<list.length;x++){
                aux +=list[x]
            }
            return aux/list.length    
        }
        
        const values = weather_code
        console.log(values)
            
        if (values == '0' || values == '1' || values == '2' || values =='3'){document.getElementById('imgs').src = './images/clear.png';}

        else if (values == '45' || values == '48' || values == '51' || values == '53' || values == '55' || values == '56' || values == '57' || values == '61' || values == '63' || values == '65' || values == '66' || values == '67'){
            image.src = './images/rain.png';
        }
        else if (values == '71' || values == '73' || values == '75' || values == '77' || values == '80' || values == '82' || values == '85' || values == '81' || values == '86' || values == '95' || values == '96' || values == '99'){
            image.src = './images/snow.png';
        }
        else{
            image.src = '';
        }
        var temp = prom(temp_values);
        var humidity_val = prom(humidity_values);
        var wind_speed = prom(wind_values);
        temperature.innerHTML = `${parseInt(temp)}<span>°C</span>`;
        humidity.innerHTML = `${parseInt(humidity_val)  }%`;
        wind.innerHTML = `${parseInt(wind_speed)}Km/h`;
        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';
    });
});
