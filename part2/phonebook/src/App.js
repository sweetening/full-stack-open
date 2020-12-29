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
  const [ errorMessage, setErrorMessage ] = useState();

  const showNotification = (content, color = 'ff0000') => {
    setErrorMessage({ content, color });
    setTimeout(() => {
      setErrorMessage({ content: null });
    }, 5000);
  };

  const handleAdd = (event) => {
    const newPerson = { newName, newNumber };
    const existingPerson = persons.filter(
      (person) => person.name === newPerson.name
    );

    event.preventDefault();

    if (existingPerson.length > 0) {
      if (
        window.confirm(
          `${existingPerson[0].name} is already added to the phonebook, would you like to update their contact number?`
        )
      ) {
        directoryService
          .update(existingPerson[0].id, newPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== returnedPerson.id ? person : returnedPerson
              )
            );
            setNewName('');
            setNewNumber('');
            showNotification(`Updated ${returnedPerson.name}`);
          })
          .catch(() => {
            showNotification(
              `Error: ${existingPerson[0].name} already deleted`,
              'red'
            );
            setPersons(
              persons.filter((person) => person.id !== existingPerson[0].id)
            );
          });
      }
    } else {
      directoryService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
        showNotification(`Added ${returnedPerson.name}`);
      });
    }
  };

  const handleAddNameChange = (event) => setNewName(event.target.value);

  const handleAddNumberChange = (event) =>
    setNewNumber(event.target.value);

  const handleFilter = (event) => setFilterBy(event.target.value);

  const handleDelete = (id, nameTBD) => {
    if (window.confirm(`Delete ${nameTBD}?`)) {
      directoryService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          showNotification(`Deleted ${nameTBD}`);
        })
        .catch(() => {
          showNotification(`Error: ${nameTBD} already deleted`, 'red');
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  useEffect(() => {
    directoryService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons));
  }, []);

  return (
    <div>
      <h1>Phonebook 2.0</h1>
      <hr />
      <Notification message={errorMessage} />
      <div>
        Filter:<input value={filterBy} onChange={handleFilter} />
      </div>

      <h2>Add a new:</h2>
      <Form
        handleAdd={handleAdd}
        handleAddPersonNameInput={newName}
        handleAddNameChange={handleAddNameChange}
        handleAddPersonNumberInput={newNumber}
        handleAddNumberChange={handleAddNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={filterBy}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
