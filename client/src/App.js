import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import Header from './components/Header';
import PrivateRoute from './components/PrevateRoute'
import LoginPage from "./components/LoginPage";
import EmployeeForm from "./components/Forms/EmployeeForm";
import Employees from "./components/Employees";
import Dashboard from "./components/ButtonList/Dashbord";

function App() {
  return (
    <Router>
        < Dashboard />
    </Router>
  );
}

export default App;
