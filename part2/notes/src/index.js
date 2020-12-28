import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Course from './components/Course';
import axios from 'axios'

axios
  .get('http://localhost:3001/notes')
  .then(response => {
    const notes = response.data
    console.log(notes)
  })

const promise2 = axios.get('http://localhost:3001/foobar')
console.log(promise2)

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    console.log('effect');
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, []);
  console.log('render', notes.length, 'notes');

  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
      <div>
      <h1>Web Development Curriculum</h1>
        {courses.map((course) => (
          <Course key={course.id} course={course} />
        ))}
      </div>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));
