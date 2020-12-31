import React from "react";

const Form = ({ handleAddNameChange, handleAddNumberChange, newName, newNumber, handleSubmit }) => {

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:
        <input
          value={newName}
          onChange={handleAddNameChange}
        />
      </div>
      <br />
      <div>
        number:
        <input
          value={newNumber}
          onChange={handleAddNumberChange}
        />
      </div>
      <div>
        <button type="submit">add person</button>
      </div>
    </form>
  )
};

export default Form;
