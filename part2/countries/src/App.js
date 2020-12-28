import React, { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";
import Filter from "./components/Filter";

const App = () => {
  const [countries, setCountries] = useState([]);
  const[filterCountries, setFilterCountries] = useState([]);
  const [countryQuery, setCountryQuery] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, []);

  const handleChange = (event) => {
    setCountryQuery(event.target.value)
    setFilterCountries(getFilterCountries(event.target.value))
  };

  const displayCountry = (c) => {
    setFilterCountries([filterCountries[c]])
  };

  const getFilterCountries = (query) => countries.filter(
    country => {
      const countryName = country.name.toLowerCase()
      return countryName.includes(query.toLowerCase())
    }
  );

  return (
    <>
      <Filter
        onChange={handleChange}
        value={countryQuery}
      />
      <Countries
        countries={filterCountries}
        onClick={displayCountry}
      />
    </>
  )
};

export default App;
