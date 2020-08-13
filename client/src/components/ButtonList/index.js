import React from 'react';
import { Link } from 'react-router-dom';
import './styles.module.sass';

//круто было бы вставить картинки в линки

export default function ButtonList() {
  return (
    <div className='btnList'>
      <button><Link to='/company'>Компания</Link></button> {/* информация о компании */}
      <button><Link to='staff'>Cотрудники</Link></button> {/* список сотрудников */}
      <button><Link to='/timetable'>Расписание</Link></button> {/* расписание на неделю */}
      <button><Link to='/note'>Памятка</Link></button> {/* памятка охранника труда */}
    </div>
  )
}
