import React, { useState } from 'react';
import { connect } from 'react-redux';

import http from '../utils/http';
import CookieManager from '../utils/cookie';
import * as apiActions from '../redux/actions/apiActions';
import { Link } from 'react-router-dom';
import Error from './Error';

const LoginPage = (props) => {
  const [error, setError] = useState(undefined);

  return (
    <div>
      {error && <Error message={error} />}
      <form action="#" className="form login__form" onSubmit={(e) => onSubmit(e, props, setError)}>
        <div className="container">
          <div className="form__group">
            <label htmlFor="username" className="form__label">
              Username
            </label>
            <input type="text" className="form__input" name="username" placeholder="Enter Username" required />
          </div>

          <div className="form__group">
            <label htmlFor="password" className="form__label">
              Password
            </label>
            <input type="password"  className="form__input" name="password" placeholder="Enter Password" required />
          </div>

          <div className="form__group">
            <button type="submit" className="btn btn-primary form__btn">
              Login
            </button>
          </div>
        </div>

        <div className="container">
          <div className="form__footer">
            Don't have an account? <Link to="/register">Register</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

function onSubmit(e, props, setError) {
  e.preventDefault();

  const username = e.target.username.value;
  const password = e.target.password.value;

  e.target.username.value='';
  e.target.password.value='';

  http
    .post('/auth/login', { username, password })
    .then((res) => {
      if(res.data) {
        props.storeToken(res.data.token);
        props.storeUser(res.data.user);

        const expiryDays = 1;
        CookieManager.setCookie("user", JSON.stringify(res.data.user), expiryDays);
        CookieManager.setCookie("token", res.data.token, expiryDays);

        props.history.push('/');
      }else {
        setError(res.error.message);
      }
    })
    .catch((err) => console.log(err));
}

function mapStateToProps(state) {
  return { ...state };
}

function mapDispatchToProps(dispatch) {
  return {
    storeToken: (token) => dispatch(apiActions.storeToken(token)),
    storeUser: (user) => dispatch(apiActions.storeUser(user))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
