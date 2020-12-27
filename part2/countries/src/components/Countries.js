import React from "react";
import Country from "./Country";

const Countries = ({ countries, handleClick }) => {
  const tooMany = countries.length > 10;
  const many = countries.length > 1 && countries.length <= 10;
  const one = countries.length === 1;
  const arr = Array.from(countries);

  const allCountries = arr.map((country) => {
    return (
      <div key={country.alpha3Code}>
        {country.name}{" "}
        <button onClick={handleClick} id={country.name}>
          Show
        </button>
      </div>
    );
  });

  return (
    <div>
      {tooMany && "Too many matches, specify another filter"}
      {many && <div>{allCountries}</div>}
      {one && <Country country={countries[0]} />}
    </div>
  );
};

export default Countries;
