import React from 'react';

const Person = ({ id, name, number }) => {
  return (
    <div>
      <li>{name}: {number}</li>
    </div>
  )
};

export default Person;
