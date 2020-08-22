import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ModalPortal from "../../ModalPortal/ModalPortal";
import portalStyles from "../../ModalPortal/styles.module.sass";
import UploadScans from "../../UploadScans/UploadScans";
import { useDispatch, useSelector } from "react-redux";
import { clearFileList } from "../../../redux/actionCreators/ActionCreators";
import styles from '../../Dnd/style.module.css';
import { DragDropContext } from '../../Dnd/react-beautiful-dnd.esm';
import Column from '../../Dnd/Column';
import updateSignedList from '../../../redux/thunks/updateSignedList';
import {updateColumns} from '../../../redux/actionCreators/ActionCreators.js';
import { eachWorkerThunk } from '../../../redux/thunks/eachWorkerThunk';

function Documents() {
  const companyId = useSelector(state => state.auth.companyId);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { ohsDocs, columns } = useSelector(state => state.allStaff.worker);
  const [showUploadModal, setShowUploadModal] = useState(false);
  
  
  useEffect(() => {
    if (!showUploadModal) {
    dispatch(eachWorkerThunk(companyId, id));
    }
  }, [dispatch, companyId, id, showUploadModal])

  // dnd


  // console.log(ohsDocs);
  // console.log(signedOhsIds);
  // console.log(unsignedOhsIds);
  // console.log(columns)

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId
      && destination.index === source.index
    ) {
      return;
    }
    if (destination.droppableId !== source.droppableId) {
      const columnSource = columns[source.droppableId];
      const columnDest = columns[destination.droppableId];
      ohsDocs[`${draggableId}-s`] = { id: `${draggableId}-s`, content: `${draggableId}-s ${Math.floor(Math.random() * 10)}` }
      // const newTaskIdsSource = Array.from(columnSource.taskIds);
      const newDocIdsSource = [...columnSource.docIds];
      // const newTaskIdsDest = Array.from(columnDest.taskIds);
      const newDocIdsDest = [...columnDest.docIds];
      // newTaskIdsSource.splice(source.index, 1);
      // newTaskIdsDest.splice(destination.index, 0, draggableId);
      // if (!newDocIdsDest.includes(`${draggableId}-s`)) {
      //   newDocIdsDest.splice(destination.index, 0, `${draggableId}-s`);
      // }
      
      const newColumnSource = {
        ...columnSource,
        docIds: newDocIdsSource,
      }
      const newColumnDest = {
        ...columnDest,
        docIds: newDocIdsDest,
      }
      
      // dispatch(updateColumns({
      //   ...columns,
      //   [newColumnSource.id]: newColumnSource,
      //   [newColumnDest.id]: newColumnDest,
      // }))
      dispatch(updateSignedList(id, newDocIdsDest))
      handleClick();
      return;
    }
    
    const column = columns[source.droppableId];
    const newDocIds = Array.from(column.docIds);
    newDocIds.splice(source.index, 1);
    newDocIds.splice(destination.index, 0, draggableId);
    
    const newColumn = {
      ...column,
      docIds: newDocIds,
    }
    
    dispatch(updateSignedList(id, newDocIds))
    dispatch(updateColumns({
      ...columns,
      [newColumn.id]: newColumn,
    }))
  }

  const onDragStart = (start) => {
  }

  const onDragUpdate = () => {
  }

  // /dnd

  function handleClick() {
    if (showUploadModal) {
      dispatch(clearFileList());
    }
    setShowUploadModal((state) => (!state));
  }



  if (columns) {
    return (
      <div className={styles.allContainer}>
        {/* <button onClick={handleClick}>Показать Upload Modal</button> */}
        {showUploadModal && <ModalPortal className={portalStyles.myModal}>
          <UploadScans workerId={id} handleClose={handleClick} setShowUploadModal={setShowUploadModal} />
        </ModalPortal>}
        <div className={styles.container}>
          <DragDropContext
            onDragEnd={onDragEnd}
            onDragStart={onDragStart}
            onDragUpdate={onDragUpdate}
          >
            {columns.colOrder.map((columnId, index) => {
              const column = columns[columnId];
              let tasks = column.docIds.map((docId) => ohsDocs.find(doc => {
                // console.log(doc);
                // console.log(docId);
                return doc._id === docId;
              }));
              // console.log(index);
              if (!tasks[0]) tasks = [];
              // console.log(tasks);
              return <Column key={column.id} column={column} tasks={tasks} index={index} />
            })}
          </DragDropContext>
        </div>
      </div>
    );
  }
  return null;
}

export default Documents;
