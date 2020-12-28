import React from "react";

const Filter = ({ value, onChange }) => {
  return (
    <>
      Find countries:
      <input
        type="text"
        id="filter"
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default Filter;
