import React, { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries"
import Filter from "./components/Filter"


function App() {
  const [countries, setCountries] = useState([]);
  const [filterBy, setFilterBy] = useState('');
  const [hasFilter, setHasFilter] = useState(false);

  const hook = () => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => {
      setCountries(response.data);
    });
  };

  useEffect(hook, []);

  const countriesFilter = countries.filter((country) => {
    return country.name.toLowerCase().includes(filterBy.toLowerCase());
  });

  const results = countriesFilter.some((country) => {
    return country.name.toLowerCase() === filterBy.toLowerCase();
  });

  let exactResult;
  if (results) {
    exactResult = filterBy.filter((country) => {
      return country.name.toLowerCase() === filterBy.toLowerCase();
    });
  }

  const handleFiltering = (event) => {
    setFilterBy(event.target.value);
    if (event.target.value === "") setHasFilter(false)
    else setHasFilter(true)
  };

  const handleClick = (event) => {
    setFilterBy(event.target.id);
  };

  return (
    <div>
      <h1>Countries</h1>
      <Filter onChange={(event) => handleFiltering(event)} value={filterBy} />
      {hasFilter && results.data && <Countries countries={exactResult} />}
      {hasFilter && !results && (
        <Countries
          countries={filterBy}
          handleClick={(event) => handleClick(event)}
        />
      )}
    </div>
  );
};

export default App;
