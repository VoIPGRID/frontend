import React, { Component } from 'react';

import { connect } from 'react-redux';
import { loginUser } from './LoginActions';

class Login extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            'email': '',
            'password': ''
        }
    }

    async handleSubmit(e) {
        let response;

        const values = {
            email: this.state.email,
            password: this.state.password,
            xcsrftoken: window.__INITIAL_STATE__.csrf
        };

        e.preventDefault();

        response = await this.props.loginUser(values);

        const { status } = response.payload;

        console.log(response)

        if (status === 200 || status === 201) {
            window.__INITIAL_STATE__ = response.payload.data;
            this.props.history.push('/partners');
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
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input className="input" type="email" value={this.state.email} onChange={this.handleEmailChange.bind(this)}/>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input className="input" type="password" value={this.state.password} onChange={this.handlePasswordChange.bind(this)} />
                    </div>
                </div>

                <div className="control">
                  <input type="submit" className="button is-primary" value="Submit" />
                </div>
            </form>
        );
    }
}

export default connect(null, {loginUser})(Login);

// export default Login;
