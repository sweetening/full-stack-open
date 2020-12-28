import React from 'react';
import Person from './Person';

const Persons = ({ persons, removePerson }) => {
  const showPersons = () => {
    return persons?.map(person =>
      <li key={Math.random()}>
        <Person
          key={Person.name}
          person={person.name}
          number={person.number}
        />
        <button onClick={() => removePerson(person.id, person.name, person.number)}>
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
