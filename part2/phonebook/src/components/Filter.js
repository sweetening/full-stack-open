import React from "react";

const Filter = (props) => {
  return(
  <div>
    <p> Filter: </p>
    <input value={props.value} onChange={props.onChange}></input>
  </div>
  );
};

export default Filter;
