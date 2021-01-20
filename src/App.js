import './App.css';
import { useEffect, useState } from 'react';


function App() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const API_URL = `http://api.openweathermap.org/data/2.5/weather?q=Sorocaba&units=imperial&appid=${API_KEY}`;
  
  const [weather, setWeather] = useState([]);
  
  useEffect(() => {
    getWeather();
  }, [])

  const getWeather = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setWeather(data);
  }

  return (
    <div className="App">
      {/* <img src="https://images.pexels.com/photos/3768/sky-sunny-clouds-cloudy.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt=""/> */}
      <h1>{weather.name}</h1>
    </div>
  );
}

export default App;
