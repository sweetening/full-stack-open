import React from 'react'

const Header = (props) => {
  return (
    <h1>{props.name}</h1>
  )
};

// const Total = ({ parts }) => {
//   const sum = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
//   return (
//     <p>Number of exercises {sum}</p>
//   )
// };

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  )
};

const Content = ({ parts }) => {
  const conPart = parts.map((part) => {
    return <Part key={part.id} name={part.name} exercises={part.exercises} />
  })
  const noParts = !Array.isArray(conPart) || !conPart.length;

  return (
    <div>
      {noParts && <p>There aren't any parts in this course yet.</p>}
      {!noParts && conPart}
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </div>
  )
};

export default Course;
