import React from 'react';
import { Draggable } from '../../react-beautiful-dnd.esm'
import styles from './style.module.css';
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import InsertDriveFileRoundedIcon from '@material-ui/icons/InsertDriveFileRounded';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    purple: {
      backgroundColor: 'rgb(64, 86, 181)',
      marginLeft: '5px'
    },
    zagr: {
      color: 'rgb(64, 86, 181)',
      height: '100%',
      marginRight: '5px'
    },
  }),
);

export default function ({ task, index }) {
  const classes = useStyles();
  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided, snapshot) => {
        const isDragging = snapshot.isDragging;
        return (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            {...isDragging ? { className: styles.dragging } : { className: styles.task }}
          >
            <div className={styles.filename}>
              {/* <img src="/file.png" alt="" className={styles.img} /> */}
              <ListItemAvatar>
                <Avatar className={classes.purple}>
                  <InsertDriveFileRoundedIcon />
                </Avatar >
              </ListItemAvatar>
              {task.metadata.filename}
            </div>
            <div className={styles.button}>
              <a href={task.metadata.downloadPath}>
                <CloudDownloadOutlinedIcon className={classes.zagr} fontSize={'large'}/>
              </a>
            </div>
          </div>
        )
      }
      }
    </Draggable>
  )
}
