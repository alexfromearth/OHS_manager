import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { allStaffThunk } from '../../redux/thunks/allStaffThunk.js'


export default function Employees() {
  const dispatch = useDispatch()
  const history = useHistory()
  const employees = useSelector(state => state.allStaff.list)
  const id = useSelector(state => state.auth.companyId)

  useEffect(() => {
    dispatch(allStaffThunk(id))
  }, [dispatch, id])

  return (
    <>
      <div>
        <button onClick={() => history.push('/employee/new')}>Добавить работника</button>
        <h1>Cотрудники</h1>
        <button>Фильтр</button>
      </div>
      <div>
        {employees && employees.map(el => { //внутри див с флексом джастифай контент битвин
          return <div key={el._id}>
            <div id={el._id}  onClick={() => history.push(`/employee/${el._id}`)}>
              {el.name} {el.profession}
            </div>
            <br />
          </div>
        })}
      </div>
    </>
  )
}
