import './App.css';
import { useEffect, useState } from 'react';


function App() {
  
  const [weather, setWeather] = useState({
    main: {},
    sys: {},
    weather: {}
  });
  console.log(weather);
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  
  const API_KEY = process.env.REACT_APP_API_KEY;
  const API_URL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`;
  
  useEffect(() => {
    getUserLocaction();
    if (lat != undefined & lon != undefined) {
      getWeather();
    }
  }, [lat, lon])

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  
  function success(pos) {
    var crd = pos.coords;
    setLat(crd.latitude);
    setLon(crd.longitude);
  }
  
  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  const getUserLocaction = () => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            navigator.geolocation.getCurrentPosition(success);
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            console.log("denied");
          }
        });
    }
  };

  const getWeather = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setWeather(data);
  }

  return (
    <div className="App">
      {/* <img src="https://images.pexels.com/photos/3768/sky-sunny-clouds-cloudy.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt=""/> */}
      <main>
        <section className="glass">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <h1>{weather.main.temp}° F {weather.weather.description}</h1>
          <p>{weather.main.pressure} mbar</p>
        </section>
      </main>
    </div>
  );
}

export default App;
