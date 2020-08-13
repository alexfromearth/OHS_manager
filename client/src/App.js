import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import Header from './components/Header';
import PrivateRoute from './components/PrevateRoute'

function App() {
  return (
    <Router>
      <header>
        {/* верхняя часть Лого */}
      </header>
      {/* левая баттон панель */}
      <Switch>
        {/* <PrivateRoute exact path='/home'> <Form /> </PrivateRoute> */}
        <Route exact path='/'> <LoginPage /> </Route>
      </Switch>
    </Router>
  );
}

export default App;
