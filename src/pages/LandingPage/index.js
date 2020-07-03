import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { login } from "../../state/apis/user";

import './index.css';

const LandingPage = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = e => {
    e.preventDefault();
    const user = {
      username,
      password
    };
    props
      .login(user)
      .then(res => Promise.resolve(res))
      .catch(err => Promise.resolve(err));
  };

  if (props.isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="landing-page signin-page">
      <form className="login-form">
        <input
          type="text"
          name="username"
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          onChange={e => setPassword(e.target.value)}
        />
        <div className='action-section'>
          <input type="submit" onClick={onLogin} />
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  login: (data) => dispatch(login(data))
});

const mapStateToProps = state => {
  return ({
    isLoggedIn: state.user && state.user.token,
    userInfo: state.user
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
