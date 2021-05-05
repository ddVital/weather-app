import { useEffect, useState } from "react";
import "./App.css";
import SwitchSelector from "react-switch-selector";
import { ReactComponent as LoadingIcon } from "./img/sun.svg";

function App() {
  // const [weather, setWeather] = useState({});

  const [unit, setUnit] = useState("metric");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [lon, setLon] = useState("");
  const [lat, setLat] = useState("");
  const [weather, setWeather] = useState({
    city: {},
    list: [
      {
        main: {
          temp: "",
        },
        wind: {},
      },
    ],
  });

  const API_KEY = process.env.REACT_APP_API_KEY;
  const API_URL = `http://api.openweathermap.org/data/2.5/forecast?q=sorocaba&units=${unit}&cnt=7&appid=${API_KEY}`;

  // useEffect(() => {
  // getWeather();
  // }, []);

  useEffect(() => {
    getWeather(API_URL);
  }, [unit]);

  // fetch the api and get the weather
  const getWeather = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();

    setLoading(true);
    setWeather(data);
  };

  const options = [
    {
      label: "°C",
      value: "metric",
    },
    {
      label: "°F",
      value: "imperial",
    },
  ];

  const ChangeUnit = (newValue) => {
    setLoading(false);
    setUnit(newValue);
  };

  const initialSelectedIndex = options.findIndex(({ value }) => value === unit);

  const search = (e) => {
    e.preventDefault();
    setLoading(false);
    getWeather(query);
  };

  return (
    <div className="App">
      <header className="header">
        <h1>Weather app</h1>
        <form onSubmit={search} className="search">
          <input
            type="search"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button>
            <i className="fa fa-search"></i>
          </button>
        </form>
      </header>

      {loading ? (
        <main>
          <section className="weather">
            <div>
              <h2>
                {Math.round(weather.list[0].main.temp)}
                {unit === "imperial" ? " °F" : " °C"}
              </h2>
              <p className="city-name">
                {weather.city.name}, {weather.city.country}
              </p>
              <div>
                <SwitchSelector
                  onChange={ChangeUnit}
                  options={options}
                  initialSelectedIndex={initialSelectedIndex}
                  backgroundColor={"#00000020"}
                  selectedBackgroundColor={"#00000020"}
                  selectionIndicatorMargin={0}
                  fontColor={"#fff"}
                />
              </div>
            </div>

            <div className="weather-info">
              <div className="weather-info__item">
                <i className="fa fa-cloud-rain"></i>
                <p>
                  Chance of Rain <br /> <span>1.2 km/h</span>
                </p>
              </div>
              <div className="weather-info__item">
                <i className="fa fa-wind"></i>
                <p>
                  Wind Speed <br />{" "}
                  <span>{weather.list[0].wind.speed} km/h</span>
                </p>
              </div>
            </div>
          </section>

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

function HourlyForecast({ weather, unit }) {
  return (
    <section className="hourly">
      {weather.list.map((item, index) => {
        return (
          <div className={`card ${index === 0 ? "active" : ""}`} key={index}>
            <p>{new Date(item.dt_txt).getHours()} pm</p>
            <div className="card__content">
              <h3>
                {Math.round(item.main.temp)} {unit === "imperial" ? "°F" : "°C"}
              </h3>
              {index === 0 ? (
                <span className="feels-like">
                  Feels like {Math.round(item.main.feels_like)} °C
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default App;
