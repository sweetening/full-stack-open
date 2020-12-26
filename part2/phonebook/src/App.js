import React, { useState } from 'react';

const App = () => {
  const [person, setPerson] = useState([
    { name: 'Arto Hellas' }
  ]);
  const [newName, setNewName] = useState('');
  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
  };

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
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
      ...
      <div>debug: {newName}</div>
    </div>
  )
};

export default App;
