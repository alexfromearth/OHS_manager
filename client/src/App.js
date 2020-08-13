import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import Header from './components/Header';
import PrivateRoute from './components/PrevateRoute'
import LoginPage from "./components/LoginPage";
import EmployeeForm from "./components/Forms/EmployeeForm";
import Employees from "./components/Employees";

function App() {
  return (
    <Router>
      <header>
        {/* верхняя часть Лого */}
      </header>
      {/* левая баттон панель */}
      <Switch>
        {/* <PrivateRoute exact path='/home'> <Form /> </PrivateRoute> */}
        <Route exact path='/employee/new'> <EmployeeForm /> </Route>
        <Route exact path='/'> <LoginPage /> </Route>
        <Route exact path='/company'> </Route>
        <Route exact path='/timetable'> </Route>
        <Route exact path='/note'> </Route>
        <Route exact path='/employees'> <Employees /> </Route>
        {/* <Route exact path='/employee/:id'> <Employees /> </Route> */}
      </Switch>
    </Router>
  );
}

export default App;
