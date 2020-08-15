import React from 'react';
import styles from './styles.module.sass'
import { useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import PostAddIcon from '@material-ui/icons/PostAdd';

function MedicalExaminations() {
  const worker = useSelector(state => state.allStaff.worker)


  return (
    <div className={styles.medWrapper}>
      <h2>Медицинские осмотры</h2>
      <h3>Сотрудник: Ударников Лопес Игоревич</h3>
      <Button variant="contained" color="primary">
        <PostAddIcon />
          Добавить медосмотр
        </Button>
      {/*{worker && <h6>*/}
      {/*    Сотрудник: {worker.generalInfo.lastName + ' '*/}
      {/*+ worker.generalInfo.firstName + ' ' + worker.generalInfo.middleName}*/}
      {/*</h6>}*/}
    </div>
  );
}

export default MedicalExaminations;
