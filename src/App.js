import "./App.css";
import { useEffect, useState } from "react";
import WeatherInfo from "./components/WeatherInfo";
import HourlyForecast from "./components/HourlyForecast";
import { ReactComponent as LoadingIcon } from "./img/sun.svg";

function App() {
  const [weather, setWeather] = useState({});

  const [unit, setUnit] = useState("metric");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = process.env.REACT_APP_API_KEY;
  const BASE_API_URL = `http://api.openweathermap.org/data/2.5/forecast?q=new york&units=${unit}&cnt=7&appid=${API_KEY}`;

  useEffect(() => {
    getWeather();
  }, [unit]);

  // fetch the api and get the weather
  const getWeather = async () => {
    const response = await fetch(BASE_API_URL);
    const data = await response.json();

    setLoading(true);
    setWeather(data);
  };

  const search = async (e) => {
    setLoading(true);
  };

  return (
    <div className={`App`}>
      <header className="header">
        <h1>Weather app</h1>
        <form onSubmit={search} className="search">
          <input type="search" placeholder="Search..." value={query} />
          <button>
            <i className="fa fa-search"></i>
          </button>
        </form>
      </header>

      {typeof weather.list !== "undefined" && loading === true ? (
        <main>
          <WeatherInfo
            weather={weather}
            setLoading={setLoading}
            setUnit={setUnit}
            unit={unit}
          />

          <HourlyForecast weather={weather} unit={unit} />
        </main>
      ) : (
        <main className="loading">
          <LoadingIcon />
        </main>
      )}
    </div>
  );
}

export default App;
