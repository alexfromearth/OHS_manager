import React from 'react';
import Container from './Container';

export default function ({ todos }) {
  return (
    <div>
      {todos.map(todo => (<Container todo={todo} />))}
    </div>
  )
}
