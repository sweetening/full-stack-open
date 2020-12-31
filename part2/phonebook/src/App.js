import React, { useState, useEffect } from 'react';
import Persons from './components/Persons';
import Notification from './components/Notification';
import Form from './components/Form';
import Filter from './components/Filter';
import directoryService from './services/directory';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filterBy, setFilterBy ] = useState('');
  const [ notification, setNotification ] = useState(null);

  const showNotification = (content, type='green') => {
    setNotification({ content, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleAddNameChange = (event) => setNewName(event.target.value);
  const handleAddNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilterBy(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(newName, newNumber);
    const existing = persons.find(p => p.name === newName)
    if (existing) {
      const ok = window.confirm(`${existing.name} already in phonebook, replace the old number with new one?`);
      console.log(existing);
      if (ok) {
        directoryService.update(existing.id, {
          name: existing.name,
          number: newNumber
        }).then(returned => {
          setPersons(persons.map(person => person.id !== existing.id ? person : returned));
          showNotification(`Changed number of  ${existing.name}`);
          setNewName();
          setNewNumber();
        })
      };

    } else {
      directoryService.create({
        name: newName,
        number: newNumber
      }).then(added => {
        setPersons(persons.concat(added));
        showNotification(`Added ${newName}`);
        setNewName('');
        setNewNumber('');
      }).catch(error => {
        console.log(error.response.data.error);
        showNotification(`${error.response.data.error} `, 'red');
      })
    }
  };

  const handleDelete = (id) => {
    const deletion = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${deletion}?`)) {
      directoryService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          showNotification(`Deleted ${deletion}`);
        })
        .catch(() => {
          showNotification(`Error: ${deletion} already deleted`, 'red');
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  useEffect(() => {
    directoryService
      .getAll()
      .then((bobby) => setPersons(bobby));
  }, []);

  const personsToShow = filterBy.length === 0 ?
    persons :
    persons.filter(p => p.name.toLowerCase().indexOf(filterBy.toLowerCase()) > 0 )

  return (
    <div>
      <h1>Phonebook 2.0</h1>
      <Notification notification={notification} />
      <div>
        <Filter
          value={filterBy}
          onChange={handleFilterChange}
        />
      </div>
      <h2>Add a new:</h2>
      <Form
        handleAddNameChange={handleAddNameChange}
        handleAddNumberChange={handleAddNumberChange}
        handleAddName={newName}
        handleAddNumber={newNumber}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons
        persons={personsToShow}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
