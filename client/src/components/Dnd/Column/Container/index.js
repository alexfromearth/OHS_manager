import React from 'react';
import { Draggable } from '../../react-beautiful-dnd.esm'
import styles from './style.module.css';

export default function ({ task, index }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => {
        const isDragging = snapshot.isDragging;
        return (
          <div

            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            {...isDragging ? { className: styles.dragging } : { className: styles.task }}
          >
            {task.content}
            {/* <img
              src="/word.svg" alt="alt" className={styles.svg}
            /> */}
          </div>
        )
      }
      }
    </Draggable>
  )
}
