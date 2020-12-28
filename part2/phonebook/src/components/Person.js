import React from 'react';

const Person = ({ name, number }) => {
  return (
    <div>
      <li>{name} {number}</li>
      <br />
    </div>
  )
};

export default Person;
