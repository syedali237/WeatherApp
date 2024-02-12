import React, {useState} from "react";
import axios from "axios";

import './WeatherApp.css';
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import humidity_icon from '../Assets/humidity.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';

function WeatherApp() {
  
  const apiKey = process.env.REACT_APP_API_KEY;

  const [city, setCity] = useState("");
  const [humidity, setHumidity] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [temperature, setTemp] = useState("");
  const [showVar, setShowVar] = useState(false);
  const [icon , setIcon] = useState(cloud_icon);

  function search(event) {
    setCity(event.target.value);
  }

  const submit = async () => {
    console.log(city);
    if (city === "") return 0;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${apiKey}`;
    try {
      const response = await axios.get(url);
      console.log(response.data);
      const result = response.data;
      setTemp(result.main.temp);
      setWindSpeed(Math.floor(result.wind.speed));
      setHumidity(result.main.humidity);
      setShowVar(true);

      if (result.weather[0].icon === "01d" || result.weather[0].icon === "01n"){
        setIcon(clear_icon);
      } else if (result.weather[0].icon === "02d" || result.weather[0].icon === "02n"){
        setIcon(cloud_icon)
      } else if (result.weather[0].icon === "03d" || result.weather[0].icon === "03n"){
        setIcon(drizzle_icon)
      } else if (result.weather[0].icon === "04d" || result.weather[0].icon === "04n"){
        setIcon(drizzle_icon)
      } else if (result.weather[0].icon === "09d" || result.weather[0].icon === "09n"){
        setIcon(rain_icon)
      } else if (result.weather[0].icon === "10d" || result.weather[0].icon === "10n"){
        setIcon(rain_icon)
      } else if (result.weather[0].icon === "13d" || result.weather[0].icon === "13n"){
        setIcon(snow_icon)
      } else {
        setIcon(clear_icon)
      }
    } catch (err) {
      console.log("error fetching data", err);
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          onChange={search}
          value={city}
          className="cityInput"
          placeholder="Search"
        />
        <div className="search-icon" onClick={submit}>
          <img src={search_icon} alt="" />
        </div>
      </div>

      <div className="weather-image">
        <img src={icon} alt="" />
      </div>
      {temperature !== null && (
        <div className="weather-temp">
          {temperature}
          {showVar && <>&deg;C</>}
        </div>
      )}
      <div className="weather-location">{city}</div>

      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} className="icon" alt="" />
          <div className="data">
            {humidity !== null && (
              <div>
                {humidity}
                {showVar && "%"}
              </div>
            )}
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} className="icon" alt="" />
          <div className="data">
            {windSpeed !== null && (
              <div>
                {windSpeed}
                {showVar && " km/hr"}
              </div>
            )}
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;