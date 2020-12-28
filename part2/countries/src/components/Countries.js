import React from "react";
import Country from "./Country";

const Countries = ({ countries, onClick }) => {
  const outcome = () => {
    if (countries.length > 10) {
      return <p>Too many matches, specify another filter</p>
    }
    else if (countries.length === 1) {
      return <Country country={countries[0]} />
    };

    const showCountry = countries.map((country, c) =>
      <li key={country.numericCode}>
        {country.name} <button onClick={() => onClick(c)}>show</button>
      </li>
    )
    return <ul>{showCountry}</ul>
  }

  return (
    <>
      {outcome()}
    </>
  )
}

export default Countries;
