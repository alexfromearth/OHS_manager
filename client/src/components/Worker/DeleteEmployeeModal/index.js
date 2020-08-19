import React, {useState} from 'react';
import TextField from "@material-ui/core/TextField";
import styles from './styles.module.sass';
import {Button} from "antd";
import {useSelector} from "react-redux";
function DeleteEmployeeModal({handleShowModal, companyId, workerId, handleDeleteWorker}) {

  const [secretInput, setSecretInput] = useState('');
  const uploadingScans = useSelector(state => state.allStaff.uploadingScans);

  function handleInputChange(e) {
    const {value} = e.target;
    setSecretInput(value);
  }

  async function handleDelete() {
    if (!companyId && !workerId && !secretInput) return;
    handleDeleteWorker(companyId, workerId, secretInput);
    handleShowModal();
  }


  return (
    <div className={styles.wrapper}>
      <p><strong>Введите секретный ключ <br/>для удаления сотрудника</strong></p>
      <TextField id="secret" label="Секретный ключ" variant="outlined" value={secretInput}
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
