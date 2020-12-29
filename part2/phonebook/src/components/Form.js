import React from "react";

const Form = ({ handleAddPerson, newName, newNumber, handleNameChange, handleNumberChange }) => {
  return (
    <form onSubmit={handleAddPerson}>
      <>
        name: <input value={newName} onChange={handleNameChange} />
      </>
      <>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </>
      <>
        <button type="submit">add</button>
      </>
    </form>
  );
};

export default Form;
