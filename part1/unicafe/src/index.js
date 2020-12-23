import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistics = (props) => {
  if (!props.feedback) {
    return <p>No feedback yet!</p>;
  }

  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <Statistic name='good' value={props.good} />
          <Statistic name='neutral' value={props.neutral} />
          <Statistic name='bad' value={props.bad} />
          <Statistic name='all' value={props.allClicks} />
          <Statistic name='average' value={props.average} />
          <Statistic name='positive' value={props.posi + "%"} />
        </tbody>
      </table>
    </div>
  );
};

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.value}</td>
    </tr>
  )
};

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

const App = () => {
  // save clicks of each button to its own state
  const [feedback, setFeedback] = useState(false);
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const allClicks = good + neutral + bad;



  const handleGoodClick = () => {
    setFeedback(true)
    setGood(good + 1)
  };

  const handleNeutralClick = () => {
    setFeedback(true)
    setNeutral(neutral + 1)
  };

  const handleBadClick = () => {
    setFeedback(true)
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
      return num + item.number * item.score;
    }, 0);

    let result = scores / all;
    if (Number.isNaN(result)) return 0;
    return Math.round(result * 1000) / 1000;
  };

  const average = averageScore(
    [
      { number: good, score: 1 },
      { number: neutral, score: 0 },
      { number: bad, score: -1 },
    ],
    allClicks
  );

  const statistics = {
    feedback: feedback,
    good: good,
    neutral: neutral,
    bad: bad,
    allClicks: allClicks,
    average: average,
    posi: posi,
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text="Good 👍" onClick={() => handleGoodClick()} />
      <Button text="Neutral 🤝" onClick={() => handleNeutralClick()} />
      <Button text="Bad 👎" onClick={() => handleBadClick()} />
      <Statistics {...statistics} />
    </div>
  )
};

ReactDOM.render(<App />,
  document.getElementById('root')
);
