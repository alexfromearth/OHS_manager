import React from 'react';
import Container from './Container';
import { Droppable } from '../react-beautiful-dnd.esm';
import styles from './slyte.module.css';

export default function (props) {
  // useEffect(() => {
  //   if (props.tasks.length === 4) setIsfull(true);
  //   else setIsfull(false);
  // })
  let isDropDisabled = false;
  if (props.index === 0) isDropDisabled = true;
  return (
    <div>
      {props.column.title}
      <Droppable
        droppableId={props.column.id}
        isDropDisabled={isDropDisabled}
      // direction="horizontal"
      >
        {(provided) => (
          <div
            className={styles.container}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {props.tasks.map((task, index) => {
              return (
                <Container task={task} key={task._id} index={index} />
              )
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}
