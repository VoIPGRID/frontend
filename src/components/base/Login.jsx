import React, { Component } from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { loginUser } from '../../actions/BaseActions';

import Notification from './Notification';

import { StyledField } from '../helpers/forms/RenderField';
import FormButton from '../base/FormButton';

class Login extends Component {
  /**
     * Smart redux connected login component.
     * @constructor
     * @param {object} props - Props data from higher order component.
     */
  constructor(props) {
    super(props);

    // Bind this scope to the handleSubmit method.
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      email: '',
      error: '',
      password: ''
    };
  }

  /**
     * This function gets executed when the form is submitted and sends an
     * API with login credentials to log in a user.
     * @param {object} e - Event object of the form submission.
     */
  async handleSubmit(e) {
    let response;

    const values = {
      email: this.state.email,
      password: this.state.password,
      xcsrftoken: window.__STORE__.user.csrf
    };

    e.preventDefault();

    response = await this.props.loginUser(values);

    const { status } = response.payload;

    if (status === 200 || status === 201) {
      if (response.payload.data.user.authenticated === false) {
        // Set state to show an error message when the user
        // tries logging in with the wrong credentials.
        this.setState({ error: 'wrong_creds' });
      } else {
        // Set the data returned into the window store global.
        // This global gets set by our backend but we set our data
        // temporarely so it corresponds with the backend data
        // before refreshing.
        window.__STORE__ = response.payload.data;
        this.props.history.push('/partners');
      }
    } else {
      console.log('Error');
    }
  }

  render() {
    const err = this.state.error;
    return (
      <Container>
        <h1>Login</h1>

        {err && (
          <Notification type="error">
            Please enter a correct email address and password. Note that both
            fields may be case-sensitive.
          </Notification>
        )}

        <form onSubmit={this.handleSubmit}>
          <StyledField>
            <label htmlFor="name">Email</label>
            <div className="control">
              <input
                className="input"
                name="email"
                type="email"
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
              />
            </div>
          </StyledField>

          <StyledField>
            <label htmlFor="password">Password</label>
            <div className="control">
              <input
                className="input"
                type="password"
                name="password"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
              />
            </div>
          </StyledField>

          <FormButton type="submit">Submit</FormButton>
        </form>
      </Container>
    );
  }
}

const Container = styled.div`
  max-width: 400px;
  background: white;
  margin: auto;
  padding: 1rem;
  border-radius: 4px;
`;

export default connect(null, { loginUser })(Login);
