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

const MostVotes = (props) => {
  return (
    <>
      <h1>The Anecdote with Most Votes Is...</h1>
      {!props.hasVotes && <>No votes yet.</>}
      {props.hasVotes && (
        <Anecdote anecdote={props.anecdote} votes={props.votes} />
      )}
    </>
  );
};

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0));
  const [hasVotes, setHasVotes] = useState(false);

  const anecdoteId = (length) => {
    return Math.floor(Math.random() * length)
  };

  const randomNewAnecdote = () => {
    let randId;
    do {
      randId = anecdoteId(props.anecdotes.length);
    } while (randId === selected);

    setSelected(randId);
  };

  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
    setHasVotes(true);
  };

  const handleClick = (expr) => {
    switch (expr) {
      case "next":
        randomNewAnecdote();
        break;
      case "vote":
        handleVote();
        break;
      default:
        break;
    }
  };

  const maxVote = votes.reduce(
    (count, num, index) => {
      if (num > count.num) {
        count.num = num;
        count.index = index;
      }

      return count;
    },
    { num: 0 }
  );

  const anecdoteMostVoted = anecdotes[maxVote.index];


  return (
    <div>
      <h1>Anecdote Generator</h1>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <br />
      <Button text="Vote" onClick={() => handleClick("vote")} />
      <Button text="Next Anecdote" onClick={() => handleClick("next")} />
      <MostVotes
        hasVotes={hasVotes}
        anecdote={anecdoteMostVoted}
        votes={maxVote.num}
      />
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


ReactDOM.render(<App anecdotes={anecdotes} />,
  document.getElementById('root')
);
