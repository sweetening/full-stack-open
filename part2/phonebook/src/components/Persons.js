import React from 'react';

const Persons = ({ persons, handleDelete }) => {
  const showPersons = () => {
    return persons.map(p =>
      <div key={p.id}>
        <li>
        {p.name} {p.number} {}
        <button onClick={() => handleDelete(p.id, p.name, p.number)}>
          delete
        </button>
        </li>
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
