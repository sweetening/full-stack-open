import React, { useState } from 'react';
import Name from ./components/Name;

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');


  const addNameHandler = (event) => {
    event.preventDefault()
    // let newPerson = { ...persons };
    // const newArr = persons.concat(newPerson);
    setNewName(event.target)
  };

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setPersons(event.target.value)
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNameHandler}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {names.map(person =>
          <Name key={person.id} name={name} />
        )}
      </ul>
      <div>debug: {newName}</div>
    </div>
  )
};

export default App;
