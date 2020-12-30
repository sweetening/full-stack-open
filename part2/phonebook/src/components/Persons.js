import React from 'react';
import Person from './Person';

const Persons = ({ persons, handleDelete }) => {
  const showPersons = () => {
    return persons.map(p =>
      <div>
        <Person
          key={p.name}
          name={p.name}
          number={p.number}
        />
        <button onClick={() => handleDelete(p.id, p.name, p.number)}>
          delete
        </button>
        <br />
      </div>
    )
  };

  return (
    <ul>
      {showPersons()}
    </ul>
  )
};

export default Persons;
