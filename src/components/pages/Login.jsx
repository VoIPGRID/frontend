import React, { Component } from 'react';
import { func } from 'prop-types';
import history from '../../utils/history';
import { post } from '../../lib/api';
import './login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      usernameIsValid: false,
      password: '',
      passwordIsValid: false
    };
  }

  submit = e => {
    e.preventDefault();

    const { username, password, usernameIsValid, passwordIsValid } = this.state;

    if (!usernameIsValid || !passwordIsValid) {
      return;
    }

    post('/session', { body: { username, password } });
    this.props.handler();
    history.push('/');
  };

  checkDisabled = () => {
    this.setState({ isDisabled: this.isValid() });
  };

  updateUsernameState = e => {
    const username = e.target.value;
    const usernameIsValid = username && username.length > 3;

    this.setState({ username, usernameIsValid });
  };

  updatePasswordState = e => {
    const password = e.target.value;
    const passwordIsValid = password && password.length > 6;

    this.setState({ password, passwordIsValid });
  };

  render() {
    const { username, password, usernameIsValid, passwordIsValid } = this.state;

    return (
      <div className="login">
        <section>
          <form onSubmit={this.submit}>
            <ul>
              <li>
                <label
                  className={`clean required ${
                    usernameIsValid ? 'valid' : 'invalid'
                  }`}
                >
                  <span>E-mail</span>
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={this.updateUsernameState}
                  />
                </label>
              </li>
              <li>
                <label
                  className={`clean required ${
                    passwordIsValid ? 'valid' : 'invalid'
                  }`}
                >
                  <span>Password</span>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.updatePasswordState}
                  />
                </label>
              </li>
              <li>
                <button
                  disabled={!passwordIsValid || !usernameIsValid}
                  onClick={this.submit}
                >
                  Log in
                </button>
              </li>
            </ul>
          </form>
        </section>
      </div>
    );
  }
}

Login.propTypes = {
  handler: func.isRequired
};

export default Login;
