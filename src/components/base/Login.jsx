import React, { Component } from 'react';

import { connect } from 'react-redux';
import { loginUser } from '../../actions/BaseActions';

class Login extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);

        this.state = {
            email: '',
            error: '',
            password: '',
        }
    }

    async handleSubmit(e) {
        let response;

        const values = {
            email: this.state.email,
            password: this.state.password,
            xcsrftoken: window.__STORE__.user.csrf,
        };

        e.preventDefault();

        response = await this.props.loginUser(values);

        const { status } = response.payload;

        if (status === 200 || status === 201) {
            if (response.payload.data.authenticated === false) {
                this.setState({error: 'wrong_creds'});
            } else {
                window.__STORE__.user = response.payload.data;
                this.props.history.push('/partners');
            }
        } else {
            console.log('Error');
        }
    }

    handleEmailChange(e) {
        this.setState({email: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    render() {
        const err = this.state.error;
        return (
            <div>
                { err &&
                    <div className="notification is-danger">
                        <p>Please enter a correct email address and password.
                        Note that both fields may be case-sensitive.</p>
                    </div>
                }
                <form onSubmit={this.handleSubmit}>

                    <div className="field">
                        <label className="label" htmlFor="name">Email</label>
                        <div className="control">
                            <input
                                className="input" name="email" type="email" value={this.state.email}
                                onChange={this.handleEmailChange}
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label" htmlFor="password">Password</label>
                        <div className="control">
                            <input
                                className="input" type="password" name="password" value={this.state.password}
                                onChange={this.handlePasswordChange}
                            />
                        </div>
                    </div>

                    <div className="control">
                        <input type="submit" className="button is-primary" value="Submit" />
                    </div>
                </form>
            </div>
        );
    }
}

export default connect(null, {loginUser})(Login);
