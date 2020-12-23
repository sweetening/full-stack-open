import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

const Anecdote = (props) => {
  return (
    <>
      {props.anecdote}
      <br />
      has {props.votes} vote(s).
    </>
  );
};

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0));
  // const [hasVotes, setHasVotes] = useState(false);

  const handleNextClick = () => {
    setSelected(randomNewAnecdote)
  };

  const handleVoteClick = () => {
    setVotes(votes + 1)
  };

  const anecdoteId = (length) => {
    return anecdotes[Math.floor(Math.random() * anecdotes.length)]
  };

  const randomNewAnecdote = () => {
    let randId;
    do {
      randId = anecdoteId(props.anecdotes.length);
    } while (randId === selected);

    setSelected(randId);
  };

  return (
    <div>
      <h1>Anecdote Generator</h1>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <br />
      <Button text="Next Anecdote" onClick={() => handleNextClick()} />
      <Button text="Vote" onClick={() => handleVoteClick()} />
    </div>
  )
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];


ReactDOM.render(<App anecdotes={anecdotes}/>,
  document.getElementById('root')
);
