import React from 'react';

const Person = ({ name, number }) => {
  return (
    <div>
      <li>{name}</li>
      <li>{number}</li>
      <br />
    </div>
  )
};

export default Person;
