import React, { useState, useEffect } from 'react';
import Persons from './components/Persons';
import Notification from './components/Notification';
import Form from './components/Form';
import directoryService from './services/directory';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filterBy, setFilterBy ] = useState('');
  const [ errorMessage, setErrorMessage ] = useState(null);

  const showNotification = (content, color = "ff0000") => {
    setErrorMessage(content, color);
    setTimeout(() => {
      setErrorMessage("nope");
    }, 5000);
  };

  const handleAddPerson = (event) => {
    event.preventDefault();

    const existing = persons.find(p => p.name === newName);
    if (existing) {
      const ok = window.confirm(`${existing.name} already in phonebook, replace the old number with new one?`);
      if (ok) {
        directoryService.update(existing.id, {
          name: existing.name,
          number: newNumber
        }).then(returnedPerson => {
          setPersons(persons.map(person => person.id !== existing.id ? person : returnedPerson));
          showNotification(`Changed number of  ${existing.name}`);
          setNewName('');
          setNewNumber('');
        })
      };

    } else {
      directoryService.create({
        name: newName,
        number: newNumber
      }).then(addedPerson => {
        setPersons(persons.concat(addedPerson));
        showNotification(`Added ${newName}`);
        setNewName('');
        setNewNumber('');
      }).catch(error => {
        console.log(error.response.data.error);
        showNotification(`${error.response.data.error} `, 'errorMessage');
      })
    }
  };

  const handleAddNameChange = (event) => setNewName(event.target.value);
  const handleAddNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilter = (event) => setFilterBy(event.target.value);

  const handleDelete = (id, deletion) => {
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
      .then((initialPersons) => setPersons(initialPersons));
  }, []);

  const personsToShow = filterBy.length === 0 ?
    persons :
    persons.filter(p => p.name.toLowerCase().indexOf(filterBy.toLowerCase()) > 0 )

  return (
    <div>
      <h1>Phonebook 2.0</h1>
      <Notification message={errorMessage} />
      <div>
        Filter:<input value={filterBy} onChange={handleFilter} />
      </div>
      <h2>Add a new:</h2>
      <Form
        handleAddNameChange={handleAddNameChange}
        handleAddNumberChange={handleAddNumberChange}
        handleAddName={newName}
        handleAddNumber={newNumber}
        handleAddPerson={handleAddPerson}
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
