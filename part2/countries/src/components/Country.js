import React from "react";

const Country = ({ country }) => {
  const languagesList = country.languages?.map((lang) => {
    return <li key={lang.iso639_2}>{lang.name}</li>;
  });

  const timezonesList = country.timezones?.map((tz, idx) => {
    return <span key={idx}>{tz} | </span>;
  });

  return (
    <div>
      <h2>{country.name}</h2>

      <div>
        <span>
          <strong>Capital: </strong>
          {country.capital}
        </span>
        <br />
        <span>
          <strong>Population: </strong>
          {country.population}
        </span>
        <br />
        <span>
          <strong>Timezones: </strong>
          {timezonesList}
        </span>
        <br />
      </div>

      <div>
        <h3>Languages</h3>
        <ul>{languagesList}</ul>
      </div>

      <div>
        <img alt={"Country Flag"} width={"200px"} src={country.flag}></img>
      </div>
    </div>
  );
};

export default Country;
