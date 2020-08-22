// import React, { useState } from 'react';
// import { DragDropContext } from './react-beautiful-dnd.esm';
// import init from '../../dndData/index.js';
// import Column from './Column';
// import styles from './style.module.css';

// export default function () {
//   const [initData, setInitialData] = useState(init);

//   const onDragEnd = (result) => {
//     const { destination, source, draggableId } = result;
    
//     if (!destination) {
//       return;
//     }

//     if (destination.droppableId === source.droppableId
//       && destination.index === source.inde
//     ) {
//       return;
//     }
//     if (destination.droppableId !== source.droppableId) {
//       const columnSource = initData.columns[source.droppableId];
//       const columnDest = initData.columns[destination.droppableId];
//       const tasks = initData.tasks;
//       tasks[`${draggableId}-s`] = { id: `${draggableId}-s`, content: `${draggableId}-s ${Math.floor(Math.random() * 10)}` }
//       const newTaskIdsSource = Array.from(columnSource.taskIds);
//       const newTaskIdsDest = Array.from(columnDest.taskIds);

//       // newTaskIdsSource.splice(source.index, 1);
//       // newTaskIdsDest.splice(destination.index, 0, draggableId);
//       if (!newTaskIdsDest.includes(`${draggableId}-s`)) {
//         newTaskIdsDest.splice(destination.index, 0, `${draggableId}-s`);
//       }

//       const newColumnSource = {
//         ...columnSource,
//         taskIds: newTaskIdsSource,
//       }
//       const newColumnDest = {
//         ...columnDest,
//         taskIds: newTaskIdsDest,
//       }

//       const newState = {
//         ...initData,
//         columns: {
//           ...initData.columns,
//           [newColumnSource.id]: newColumnSource,
//           [newColumnDest.id]: newColumnDest,
//         }
//       }
//       setInitialData(newState);
//       return;
//     }

//     const column = initData.columns[source.droppableId];
//     const newTaskIds = Array.from(column.taskIds);
//     newTaskIds.splice(source.index, 1);
//     newTaskIds.splice(destination.index, 0, draggableId);

//     const newColumn = {
//       ...column,
//       taskIds: newTaskIds,
//     }

//     const newState = {
//       ...initData,
//       columns: {
//         ...initData.columns,
//         [newColumn.id]: newColumn,
//       }
//     }
//     setInitialData(newState);
//   }

//   const onDragStart = (start) => {
//   }

//   const onDragUpdate = () => {
//   }

//   return (
//     <div className={styles.container}>
//       <DragDropContext
//         onDragEnd={onDragEnd}
//         onDragStart={onDragStart}
//         onDragUpdate={onDragUpdate}
//       >
//         {initData.columnOrder.map((columnId, index) => {
//           const column = initData.columns[columnId];
//           const tasks = column.taskIds.map((taskId) => initData.tasks[taskId]);
//           return <Column key={column.id} column={column} tasks={tasks} index={index} />
//         })}

//       </DragDropContext>
//     </div>
//   )
// }
