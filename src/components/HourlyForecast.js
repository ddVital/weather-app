function HourlyForecast({ weather, unit }) {
  return (
    <section className="hourly">
      {weather.list.map((item, index) => {
        return (
          <div className={`card ${index === 0 ? "active" : ""}`} key={index}>
            <p>{new Date(item.dt_txt).getUTCHours()}</p>
            <div className="card__content">
              <h3>
                {Math.round(item.main.temp)} {unit === "imperial" ? "°F" : "°C"}
              </h3>
              {index === 0 ? (
                <span className="feels-like">
                  Feels like {Math.round(item.main.feels_like)}{" "}
                  {unit === "imperial" ? "°F" : "°C"}
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

export default HourlyForecast;
