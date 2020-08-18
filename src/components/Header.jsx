import React from 'react';
import { connect } from 'react-redux';

import CookieManager from '../utils/cookie';
import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <div className="header">
      <div className="container">
        <h1 className="header__heading"><Link to="/" className="header__link">To do App</Link></h1>
        {props.api.token && (
          <div className="header__user-wrapper">
            <button className="btn btn--secondary header__btn" onClick={(e) => onClick(props)}>
              Log Out
            </button>
            <div className="header__user-info">{props.api.user.firstname + ' ' + props.api.user.lastname}</div>
          </div>
        )}
      </div>
    </div>
  );
};

function onClick(props) {
  const expiryDays = 0;
  CookieManager.setCookie('token', '', expiryDays);
  props.history.push('/login');
}

function mapStateToProps(state) {
  return { ...state };
}

export default connect(mapStateToProps)(Header);
