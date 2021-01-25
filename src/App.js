import './App.css';
import cloudy from './img/cloudy.png';
import rain from './img/rain.png';
import snow from './img/snow.png';
import sunny from './img/sunny.png';
import thunderstorms from './img/thunderstorms.png';
import { useEffect, useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faWind, faTint, faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';

library.add(faWind, faTint, faTemperatureHigh)

function App() {

  // climate images 
  const images = {
    cloudy: cloudy,
    rain: rain,
    snow_light: snow,
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

  const API_KEY = process.env.REACT_APP_API_KEY;
  const API_URL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`;
  const DEFAULT_API_URL = `http://api.openweathermap.org/data/2.5/weather?q=sorocaba&units=imperial&appid=${API_KEY}`;
  
  useEffect(() => {
    getUserLocaction();
    checkUserLocation();
  }, [lon])

  const checkUserLocation = () => {
    if (lat !== undefined && lon !== undefined) {
      getWeather(API_URL);
    } else {
      getWeather(DEFAULT_API_URL);
    }
  }

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  // get the user geolocation
  const getUserLocaction = () => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            navigator.geolocation.getCurrentPosition(success);
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          }
        });
    } else {
      alert("can't access location. Loading default location")
    }
  };

  // succeded getting the user location
  function success(pos) {
    var crd = pos.coords;
    setLat(crd.latitude);
    setLon(crd.longitude);
  }
  
  // error to get the user location
  function errors(err) {
    console.warn(`ERROR (${err.code}): ${err.message}`);
  }

  // fetch the api and get the weather
  const getWeather = async (URL) => {
    const response = await fetch(URL);
    const data = await response.json();
    changeImage(data.weather[0].main);
    setWeather(data);
  }

  // change the shown image based on the climate 
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
        setImage(images.sunny);
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
