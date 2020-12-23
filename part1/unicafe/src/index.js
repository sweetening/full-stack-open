import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const allClicks = good + neutral + bad;

  const handleGoodClick = () => {
    setGood(good + 1)
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  };

  const handleBadClick = () => {
    setBad(bad + 1)
  };

  const percentage = (num, total) => {
    let result = (num / total) * 100;

    if (Number.isNaN(result)) return 0;

    return Math.round(result * 1000) / 1000;
  };

  const posi = percentage(good, allClicks);

  const averageScore = (scoreArray, all) => {
    const scores = scoreArray.reduce((num, item) => {
      return num + item.number * item.weight;
    }, 0);

    let result = scores / all;
    if (Number.isNaN(result)) return 0;
    return Math.round(result * 1000) / 1000;
  };

  const average = averageScore(
    [
      { number: good, weight: 1 },
      { number: neutral, weight: 0 },
      { number: bad, weight: -1 },
    ],
    allClicks
  );

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={handleGoodClick}>
        Good
      </button>
      <button onClick={handleNeutralClick}>
        Neutral
      </button>
      <button onClick={handleBadClick}>
        Bad
      </button>

      <h1>Statistics</h1>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>all: {allClicks}</p>
      <p>average: {average}</p>
      <p>positive: {posi}</p>
    </div>
  )
};

ReactDOM.render(<App />,
  document.getElementById('root')
);
