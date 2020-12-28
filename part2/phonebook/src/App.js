import React, { useState, useEffect } from 'react';
import Persons from './components/Persons';
import Notification from './components/Notification';
import Form from './components/Form';
import directoryService from './services/directory';

const App = () => {
  const [ persons, setPersons ] = useState(['person 999-111-33333']);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filterBy, setFilterBy ] = useState('');
  const [ errorMessage, setErrorMessage ] = useState();
  const [ notification, setNotification ] = useState();

  useEffect(() => {
    directoryService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const sameName = persons?.filter((person) => person.name === newName);

    if (sameName?.length > 0) {
      if (!window.confirm(`${newPerson.name} is already added to the phonebook. Would you like to change its number?`)) return


      const sameName = persons.filter(
        person => person.name === newName
      );

      const currentPerson = sameName[0];
      currentPerson.number = newNumber;
      directoryService
        .update(currentPerson)
        .then(data => {
          setPersons(
            persons.map(person => {
              return person.id === data.id ? data : person;
            })
          );
          setNotification(`Updated ${currentPerson.name}'s number`);
        })
        .catch(error => {
          setErrorMessage(`Information of ${currentPerson.name}  has already been removed from the server`
          );
          setTimeout(() => {
            setErrorMessage(error)
          }, 3000)
          setPersons(persons.filter(p => p.id !== currentPerson.id))
        })
    } else {
      if (!persons.includes(newPerson)) {
        directoryService
          .create(newPerson)
          .then(createdPerson => {
            setPersons([...persons, createdPerson]);
            setNotification(`${newName} was added`);
          })
          .catch(err => {
            setErrorMessage(err.response.data.error);
          });
      }
      setNewName("");
      setNewNumber("");
      setTimeout(() => {
        setNotification("");
        setErrorMessage("");
      }, 3000);

      return;
    };
  };

  const removePerson = (id, name) => {
    if (!window.confirm(`Delete ${name}?`)) return

    directoryService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
        setErrorMessage(`${name} was deleted`);
      })
      .catch(error => {
        setErrorMessage(`Information of ${name} has already been removed from server`);
        setPersons(persons.filter(p => p.id !== id))
        console.log(error);
      })
  };

  const handleNameChange = event => setNewName(event.target.value);
  const handleNumberChange = event => setNewNumber(event.target.value);
  const handleFiltering = event => setFilterBy(event.target.value);

  const nameFilter = filterBy
    ? persons.filter(person => person.name.toLowerCase().search(filterBy.toLowerCase()) !== -1)
    : persons;

  return (
    <div>
      <h1>Phonebook</h1>
      {errorMessage ? (
        <Notification message={errorMessage} isErrorMessage={true} />
      ) : null}
      {notification ? <Notification message={notification} /> : null}
      <div>
        Filter:<input value={nameFilter} onChange={handleFiltering} />
      </div>
      <h2>Add a new</h2>
      <Form
        onSubmit={handleSubmit}
        name={newName}
        number={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />
      <br />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        setPersons={setPersons}
        removePerson={removePerson}
      />
    </div>
  )
};

export default App;
