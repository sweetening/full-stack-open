import React from "react";

const Filter = ({ value, onChange }) => {
  return (
    <>
    <div className="headline">
      <h2>What's the weather like in...</h2>
      <div className="searchbar">
        Search for weather in any country:
        <input
          type="text"
          id="filter"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
    </>
  );
};

export default Filter;
