import React, { useState, useEffect } from 'react';
import Person from './components/Person';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [filterBy, setFilterBy] = useState('');

  useEffect(() => {
    console.log('render')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, []);

  const personsToShow = showAll ? persons : persons.filter(person => person.name.toLowerCase().search(filterBy) !== -1);

  const showNumbers = () => personsToShow.map(person =>
    <Person
      key={person.name}
      name={person.name}
      number={person.number}
    />
  );

  const handlePersonNameChange = (event) => setNewName(event.target.value);

  const handlePersonNumberChange = (event) => setNewNumber(event.target.value);

  const handleFiltering = (event) => {
    setFilterBy(event.target.value)
    setShowAll(false)
  };

  const addPerson = (event) => {
    event.preventDefault();
    if (newName === '') return true;
    if (newNumber === '') return true;

    let duplicate = false
    persons.forEach(p => {
      if (p.name === newName) duplicate = true
    });

    if (!duplicate) {
      const personObj = {
        name: newName,
        number: newNumber
      };

      setPersons(persons.concat(personObj))
      setNewName('')
      setNewNumber('')
    };
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <form onSubmit={addPerson}>
        <div>
          Filter:<input value={filterBy} onChange={handleFiltering} />
        </div>
        <h2>Add a new</h2>
        Name: <input
          value={newName}
          onChange={handlePersonNameChange}
        />
        <br />
        Number: <input
          value={newNumber}
          onChange={handlePersonNumberChange}
        />
        <br />
        <button type="submit">save</button>
      </form>
      <h2>Numbers</h2>
      <ul>
        {showNumbers()}
      </ul>
    </div>
  )
};

export default App;
