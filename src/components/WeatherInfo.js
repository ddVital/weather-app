import SwitchSelector from "react-switch-selector";

function WeatherInfo({ weather, setLoading, setUnit, unit }) {
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

  return (
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
          <i className="fa fa-cloud"></i>
          <p>
            Clouds <br /> <span>{weather.list[0].clouds.all}</span>
          </p>
        </div>
        <div className="weather-info__item">
          <i className="fa fa-wind"></i>
          <p>
            Wind Speed <br />{" "}
            <span>
              {weather.list[0].wind.speed}{" "}
              {unit === "imperial" ? "mp/h" : "km/h"}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default WeatherInfo;
