// fetch(
//   `https://api.openweathermap.org/data/2.5/weather?q=dhaka&appid=de67e2cac41cd36494503c7d9421af76`
// )
//   .then((response) => response.json())
//   .then((data) => console.log(data));
// function successCallback(position) {}

// navigator.geolocation.getCurrentPosition(successCallback);
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

const flag = document.getElementById('flag');
const weatherInfo = document.getElementById('weather-info');
const time = document.getElementById('time');
const cityInput = document.getElementById('city-input');
const cityBtn = document.getElementById('city-btn');
const search = document.getElementById('search');
const body = document.querySelector('body');

weatherInfo.innerHTML = `
<img src="./images/loading.gif"  alt="" />`;

console.log(body);
cityBtn.addEventListener('click', () => {
  if (cityInput.value == null || cityInput.value == '') {
    alert('Please enter a city');
  }

  loadWeatherApiByCity(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=de67e2cac41cd36494503c7d9421af76&units=metric`
  ).then((x) => {
    console.log(x);
    search.textContent = '';
    const div = document.createElement('div');
    const img = document.createElement('img');
    if (x.weather[0].description.includes('broken clouds')) {
      img.setAttribute('src', 'https://openweathermap.org/img/wn/04d@2x.png');
      body.setAttribute('id', 'broken-clouds');
    }
    if (x.weather[0].description.includes('clear sky')) {
      img.setAttribute('src', 'https://openweathermap.org/img/wn/01d@2x.png');
      body.setAttribute('id', 'clear-sky');
    }
    if (x.weather[0].description.includes('few clouds')) {
      img.setAttribute('src', 'https://openweathermap.org/img/wn/02d@2x.png');
      body.setAttribute('id', 'clear-sky');
    }
    if (x.weather[0].description.includes('scattered clouds')) {
      img.setAttribute('src', 'https://openweathermap.org/img/wn/03d@2x.png');
      body.setAttribute('id', 'scattered-clouds');
    }
    if (x.weather[0].description.includes('shower rain')) {
      img.setAttribute('src', 'https://openweathermap.org/img/wn/09d@2x.png');
      body.setAttribute('id', 'shower-rain');
    }
    if (x.weather[0].description.includes('rain')) {
      img.setAttribute('src', 'https://openweathermap.org/img/wn/10d@2x.png');
      body.setAttribute('id', 'rain');
    }
    if (x.weather[0].description.includes('thunderstorm')) {
      img.setAttribute('src', 'https://openweathermap.org/img/wn/11d@2x.png');
      body.setAttribute('id', 'thunderstorm');
    }
    if (x.weather[0].description.includes('overcast')) {
      img.setAttribute('src', 'https://openweathermap.org/img/wn/02d@2x.png');
      body.setAttribute('id', 'clear-sky');
    }
    if (x.weather[0].description.includes('snow')) {
      img.setAttribute('src', 'https://openweathermap.org/img/wn/13d@2x.png');
      body.setAttribute('id', 'snow');
    }
    if (x.weather[0].description.includes('mist')) {
      img.setAttribute('src', 'https://openweathermap.org/img/wn/50d@2x.png');
      body.setAttribute('id', 'mist');
    }
    search.appendChild(img);
    div.innerHTML = `
    <h6 class="text-danger">Your location:  ${x.name},${x.sys.country}</h6>
    <h3>${x.main.temp}℃</h3>
    <p class="fw-bold">Feels Like ${x.main.feels_like}, ${
      x.weather[0].description
    }</p>  </p>
    <p>Humidity: ${x.main.humidity}% Pressure: ${
      x.main.pressure
    }hPa Visibility: ${x.visibility / 1000}Km    </p>
    `;
    search.appendChild(div);
  });
});

const loadWeatherApiByCity = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const loadWeatherApiByCoordinates = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

// let apiKey = 'd9e53816d07345139c58d0ea733e3870';
// $.getJSON(
//   'https://api.bigdatacloud.net/data/ip-geolocation?key=' + apiKey,
//   function (data) {
//     console.log(JSON.stringify(data, null, 2));
//   }
// );

const viewFlag = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
fetch(
  'https://api.ipdata.co?api-key=0e627afe6b5a5557baebb643e48e752739c3d1d90a4e6afe30043387'
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data.time_zone.current_time);
    // const timeHour;
    const todayTime = data.time_zone.current_time.slice(0, 10);
    time.innerHTML = `
    <h6 class="text-danger text-center">Date: ${todayTime.slice(
      8
    )}-${todayTime.slice(5, 7)}-${todayTime.slice(0, 4)}</h6>
    `;
    const lat = data.latitude;
    const lon = data.longitude;
    flag.innerHTML = `
      <span class="pe-3">Your current location:   ${data.city},   ${data.region},  ${data.country_name}</span>
      <img src="${data.flag}">
      `;
    // viewFlag(
    //   `http://api.ipstack.com/${data.ip}?access_key=78c96b91b6b61f2f2dbb64d2f47f36d2`
    // ).then((data) => {
    //   console.log(data);
    // });

    sleep(4000);
    loadWeatherApiByCoordinates(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=de67e2cac41cd36494503c7d9421af76&units=metric`
    ).then((data) => {
      weatherInfo.textContent = '';
      const div = document.createElement('div');
      const img = document.createElement('img');
      console.log(data);
      if (data.weather[0].description.includes('broken clouds')) {
        img.setAttribute('src', 'https://openweathermap.org/img/wn/04d@2x.png');
        body.setAttribute('id', 'broken-clouds');
      }
      if (data.weather[0].description.includes('clear sky')) {
        img.setAttribute('src', 'https://openweathermap.org/img/wn/01d@2x.png');
        body.setAttribute('id', 'clear-sky');
      }

      if (data.weather[0].description.includes('few clouds')) {
        img.setAttribute('src', 'https://openweathermap.org/img/wn/02d@2x.png');
        body.setAttribute('id', 'clear-sky');
      }
      if (data.weather[0].description.includes('overcast')) {
        img.setAttribute('src', 'https://openweathermap.org/img/wn/02d@2x.png');
        body.setAttribute('id', 'clear-sky');
      }
      if (data.weather[0].description.includes('scattered clouds')) {
        img.setAttribute('src', 'https://openweathermap.org/img/wn/03d@2x.png');
        body.setAttribute('id', 'scattered-clouds');
      }
      if (data.weather[0].description.includes('shower rain')) {
        img.setAttribute('src', 'https://openweathermap.org/img/wn/09d@2x.png');
        body.setAttribute('id', 'shower-rain');
      }
      if (data.weather[0].description.includes('rain')) {
        img.setAttribute('src', 'https://openweathermap.org/img/wn/10d@2x.png');
        body.setAttribute('id', 'rain');
      }
      if (data.weather[0].description.includes('thunderstorm')) {
        img.setAttribute('src', 'https://openweathermap.org/img/wn/11d@2x.png');
        body.setAttribute('id', 'thunderstorm');
      }
      if (data.weather[0].description.includes('snow')) {
        img.setAttribute('src', 'https://openweathermap.org/img/wn/13d@2x.png');
        body.setAttribute('id', 'snow');
      }
      if (data.weather[0].description.includes('mist')) {
        img.setAttribute('src', 'https://openweathermap.org/img/wn/50d@2x.png');
        body.setAttribute('id', 'mist');
      }

      weatherInfo.appendChild(img);
      div.innerHTML = `
      <h3>${data.main.temp}℃</h3>
      <p class="fw-bold">Feels Like ${data.main.feels_like}, ${
        data.weather[0].description
      }</p>  </p>
      <p>Humidity: ${data.main.humidity}% Pressure: ${
        data.main.pressure
      }hPa Visibility: ${data.visibility / 1000}Km    </p>
      `;
      weatherInfo.appendChild(div);
    });
  });
