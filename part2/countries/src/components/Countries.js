import React from "react";
import Country from "./Country";

const Countries = ({ countries, onClick }) => {
  const outcome = () => {
    if (countries.length > 10) {
      return <div className="container">Too many matches, please be more specific</div>
    }
    else if (countries.length === 1) {
      return <Country country={countries[0]} />
    };

    const showCountry = countries.map((country, c) =>
      <div className="listContainer">
        <p key={country.numericCode}>
          {country.name} <button onClick={() => onClick(c)}>Show</button>
        </p>
      </div>
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
