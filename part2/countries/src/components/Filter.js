import React from "react";

const Filter = (props) => {
  return (
    <div>
      <label>Search by name: </label>
      <input onChange={props.onChange} value={props.value}></input>
    </div>
  );
};

export default Filter;
