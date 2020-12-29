import React from 'react';
import Person from './Person';

const Persons = ({ persons, handleDelete }) => {
  const showPersons = () => {
    return persons?.map(person =>
      <ul>
        <Person
          person={person.name}
          number={person.number}
        />
        <button onClick={() => handleDelete(person.id, person.name, person.number)}>
          delete
        </button>
      </ul>
    )
  };

  return (
    <ul>
      {showPersons()}
    </ul>
  )
};

export default Persons;
