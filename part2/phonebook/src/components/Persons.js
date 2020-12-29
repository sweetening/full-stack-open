import React from 'react';
import Person from './Person';

const Persons = ({ persons, remove }) => {
  const showPersons = () => {
    return persons?.map(person =>
      <li key={Math.random()}>
        <Person
          key={Person.name}
          person={person.name}
          number={person.number}
        />
        <button onClick={() => delete(person.id, person.name, person.number)}>
          delete
        </button>
      </li>
    )
  };

  return (
    <ul>
      {showPersons()}
    </ul>
  )
};

export default Persons;
