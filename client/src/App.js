import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import Header from './components/Header';
import PrivateRoute from './components/PrevateRoute'
import LoginPage from "./components/LoginPage";
import EmployeeForm from "./components/Forms/EmployeeForm";

function App() {
  return (
    <Router>
      <header>
        {/* верхняя часть Лого */}
      </header>
      {/* левая баттон панель */}
      <Switch>
        {/* <PrivateRoute exact path='/home'> <Form /> </PrivateRoute> */}
        <Route exact path='/'> <EmployeeForm /> </Route>
      </Switch>
    </Router>
  );
}

export default App;
