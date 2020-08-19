import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import App from './../App';
import EditTodo from '../components/EditTodo';
import TodoForm from '../components/TodoForm';
import LoginPage from '../components/LoginPage';
import RegisterPage from '../components/RegisterPage';

const DefaultPage = () => (
  <div>404 Not Found</div>
);

const AppRouter = () => (
  <BrowserRouter basename="/">
    <div>
      <Switch>
        <Route path="/" component={App} exact={true} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/add" component={TodoForm} />
        <Route path="/edit" component={EditTodo} />
        <Route component={DefaultPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;