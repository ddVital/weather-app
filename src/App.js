import './App.css';
import cloudy from './img/cloudy.png';
import rain from './img/rain.png';
import snow_light from './img/snow_light.png';
import sunny from './img/sunny.png';
import thunderstorms from './img/thunderstorms.png';
import { useEffect, useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faWind, faTint, faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';

library.add(faWind, faTint, faTemperatureHigh)

function App() {
  
  const images = {
    cloudy: cloudy,
    rain: rain,
    snow_light: snow_light,
    sunny: sunny,
    thunderstorms: thunderstorms,
  }

  const [weather, setWeather] = useState({
    main: {},
    weather: [{}],
    sys: {},
    wind: {},
  });

  const [image, setImage] = useState();
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  console.log(weather);
  const API_KEY = process.env.REACT_APP_API_KEY;
  // const API_URL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`;
  const API_URL = `http://api.openweathermap.org/data/2.5/weather?q=sorocaba&units=imperial&appid=${API_KEY}`;
  
  useEffect(() => {
    // getUserLocaction();
    getWeather();
    // if (lat != undefined & lon != undefined) {
    // }
  },[])

  const getWeather = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setWeather(data);
    changeImage(data.weather[0].main);
  }

  const changeImage = (weather) => {
    const description = weather;

    switch (description) {
      case "Clouds":
        setImage(images.cloudy);
        break;
      case "Rain":
        setImage(images.rain);
        break;
      case "Snow":
        setImage(images.snow_light);
        break;
      case "Sunny":
        setImage(images.sunny);
        break;
      case "Thunderstorms":
        setImage(images.thunderstorms);
        break;
      default:
        // setImage(images.sunny);
        break;
    }
  }

  return (
    <div className="App">
      <main>
        <section className="glass">
          <h1 className="city-name">{weather.name}, {weather.sys.country}</h1>
          
          <div className="weather-info">
          <div className="info">
              <p><FontAwesomeIcon icon="temperature-high" /> {weather.main.temp_max}° F / {weather.main.temp_min}° F</p>
              <p><FontAwesomeIcon icon="tint" /> {weather.main.humidity}%</p>
              <p><FontAwesomeIcon icon="wind" /> {weather.wind.speed} mph</p>
            </div>

            <div className="temperature">
              <img src={image} alt={weather.weather[0].description} className="weather-img" />
              <p className="temp">{weather.main.temp}°</p>
            </div>
          </div>

        </section>
      </main>
    </div>
  );
}

export default App;
