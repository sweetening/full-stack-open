import React from "react";

const Form = ({ onSubmit, name, number, onNameChange, onNumberChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <>
        name: <input value={name} onChange={onNameChange} />
      </>
      <>
        number: <input value={number} onChange={onNumberChange} />
      </>
      <>
        <button type="submit">add</button>
      </>
    </form>
  );
};

export default Form;
