import React, { Component } from 'react';
import { connect } from 'react-redux';

import http from './utils/http';
import Tabs from './components/Tabs';
import CookieManager from './utils/cookie';
import { storeTodos } from './redux/actions/todoActions';
import VisibleTodoList from './components/VisibleTodoList';
import { storeToken, storeUser } from './redux/actions/apiActions';
import Header from './components/Header';

class App extends Component {
  componentDidMount() {
    const token = CookieManager.getCookie("token");

    if(token) {
      const user = JSON.parse(CookieManager.getCookie("user"));

      this.props.storeToken(token);
      this.props.storeUser(user);
    } else {
      this.props.history.push('/login');
    }

    if (token) {
      http
        .get('/todos', token)
        .then((todos) => {
          if (todos.data) {
            this.props.storeTodos(todos.data);
          } else {
            //error
            todos.error.code === 500 && this.props.storeTodos([]);
          }
        })
        .catch((err) => console.log(err));
    }
  }

  render() {
    const LABELS = { all: 'All', active: 'Active', completed: 'Completed' };

    return (
      <div>
        <Header {...this.props} />
        <Tabs>
          <div label={LABELS.all}>
            <VisibleTodoList />
          </div>

          <div label={LABELS.active}>
            <VisibleTodoList />
          </div>

          <div label={LABELS.completed}>
            <VisibleTodoList />
          </div>
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { token: state.api.token };
}

function mapDispatchToProps(dispatch) {
  return {
    storeTodos: (todos) => dispatch(storeTodos(todos)),
    storeToken: (token) => dispatch(storeToken(token)),
    storeUser: (user) => dispatch(storeUser(user))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
