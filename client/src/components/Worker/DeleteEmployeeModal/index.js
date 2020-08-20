import React, {useState} from 'react';
import TextField from "@material-ui/core/TextField";
import styles from './styles.module.sass';
import {Button} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {deleteWorkerThunk} from "../../../redux/thunks/deleteWorkerThunk";
import {useHistory} from 'react-router-dom';

function DeleteEmployeeModal({handleShowModal, companyId, workerId}) {

  const [secretInput, setSecretInput] = useState('');
  const uploadingScans = useSelector(state => state.allStaff.uploadingScans);
  const dispatch = useDispatch();
  const history = useHistory();

  function handleInputChange(e) {
    const {value} = e.target;
    setSecretInput(value);
  }


  async function handleDelete() {
    if (!companyId && !workerId && !secretInput) return;
    dispatch(deleteWorkerThunk(companyId, workerId, secretInput));
    history.push('/employees');
    handleShowModal();
  }


  return (
    <div className={styles.wrapper}>
      <p><strong>Введите секретный ключ <br/>для удаления сотрудника</strong></p>
      <TextField id="secret" label="Секретный ключ" type="password" variant="outlined" value={secretInput}
                 onChange={handleInputChange}/>
      <div>
        <Button
          className={styles.deleteBtn}
          disabled={secretInput.length < 1}
          loading={uploadingScans}
          onClick={handleDelete}
        >Удалить
        </Button>
        <Button onClick={handleShowModal}>Отмена</Button>
      </div>
    </div>
  );
}

export default DeleteEmployeeModal;
