import React, { useState, useEffect } from "react";
import axios from 'axios';

const Country = ({ country }) => {
  const [weather, setWeather] = useState();
  const API_KEY = process.env.REACT_APP_API_KEY;
  const { name, capital, population, languages, flag } = country;

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${capital}`)
      .then(response => {
        setWeather(response.data)
      })
  }, [API_KEY, capital]);

  const languageList = () => languages.map(
    ({ iso639_1, name }) => <li key={iso639_1}>{name}</li>
  );

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  };

  const weatherForecast = () => {
    if (!weather) return <p>We're sorry, no information can be displayed at this time.</p>

    const { temperature, weather_icons, wind_speed, wind_dir } = weather.current
    return (
      <>
        <p>
          <b>Temperature: </b> {temperature} °C
        </p>
        {
          weather_icons.map((icon, index) =>
            <img key={index} src={icon} width="30px" borderRadius="4px" alt='weather forecast' />
          )
        }
        <p>
          <b>Wind: </b>{wind_speed} kph, direction: {wind_dir}
        </p>
      </>
    );
  };

  return (
    <>
      <div className="container">
        <h1>✨ {name} ✨</h1>
        <p><strong>Capital: </strong>{capital}</p>
        <p><strong>Population: </strong>{numberWithCommas(population)}</p>
        <h3>Languages spoken in {name}:</h3>
        <p>{languageList()}</p>
        <img src={flag} width="200px" alt='country flag' />
        <h3>Weather in {capital}:</h3>{weatherForecast()}
      </div>
    </>
  );
};

export default Country;
