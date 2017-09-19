import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withTranslate } from 'react-redux-multilingual'

import { getUser, updateUser, emptyUser } from '../../actions/UserActions';

import renderField from '../helpers/forms/RenderField';

// Error messages
const requiredField = value => (value ? undefined : 'This field is required.');

class UserProfileForm extends Component {
    constructor(props) {
        super(props);

        this._handleSubmit = this._handleSubmit.bind(this);
        this._getPreferredLanguages = this._getPreferredLanguages.bind(this);
    }

    async componentDidMount() {
        await this.props.getUser();
    }

    componentWillUnmount() {
        this.props.emptyUser();
    }

    async _getPreferredLanguages() {
        const options = [
            {value: 'nl', label: this.props.translate('Dutch')},
            {value: 'en', label: this.props.translate('English')},
        ]

        return { options };
    }

    async _handleSubmit(values) {
        let response;

        if (!values.old_password) {
            values.old_password = '';
        }

        if (!values.password) {
            values.password = '';
        }

        if (values.id) {
            response = await this.props.updateUser(values);
        }

        const { status } = response.payload;

        if (status === 200 || status === 201) {

            this.props.history.push('/partners');

            this.props.dispatch({
                type: 'SET_LOCALE',
                locale: values.profile.language,
            })

        } else {
            // Loop over errors and throw a new SubmissionError for every field
            // that has an error.
            response.payload.errors.map((err) => {
                let error = {};
                error[err.field] = this.props.translate(err.message);
                throw new SubmissionError(error)
            })
        }
    }

    render() {
        const { handleSubmit, translate } = this.props;

        return (
            <div className="main">

                <form onSubmit={handleSubmit(this._handleSubmit)}>

                    <h2 className="subtitle">{translate('Personal')}</h2>

                    <Field
                        label={translate('First name')}
                        validate={requiredField}
                        name="profile[first_name]"
                        type="text"
                        required="true"
                        component={renderField}
                    />

                    <Field
                        label={translate('Preposition')}
                        name="profile[preposition]"
                        type="text"
                        component={renderField}
                    />

                    <Field
                        label={translate('Last name')}
                        validate={requiredField}
                        name="profile[last_name]"
                        type="text"
                        required="true"
                        component={renderField}
                    />

                    <h2 className="subtitle">{translate('Password')}</h2>

                    <Field
                        label={translate('Old password')}
                        name="old_password"
                        type="password"
                        component={renderField}
                    />

                    <Field
                        label={translate('New password')}
                        name="new_password1"
                        type="password"
                        helpText={
                            translate('Password should have at least 6 characters and 1 non-alphabetical character')
                        }
                        component={renderField}
                    />

                    <Field
                        label={translate('New password confirmation')}
                        name="new_password2"
                        type="password"
                        component={renderField}
                    />

                    <h2 className="subtitle">{translate('Preferences')}</h2>

                    <Field
                        label={translate('Preferred language')}
                        name="profile[language]"
                        type="select"
                        required="true"
                        component={renderField}
                        loadOptions={this._getPreferredLanguages}
                    />

                    <Field
                        label={translate('Log out after 10 minutes')}
                        name="session_expiry"
                        type="checkbox"
                        component={renderField}
                    />

                    <div className="field is-grouped margin-top-10">
                        <div className="control">
                            <button type="submit" className="button is-primary">Save</button>
                        </div>
                        <div className="control">
                            <Link className="button margin-left-5" to="/partners/">Cancel</Link>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

function validate(values, props) {
    let errors = {};

    if (values.new_password1 !== values.new_password2) {
        errors.new_password1 = props.translate('The two password fields didn\'t match');
        errors.new_password2 = props.translate('The two password fields didn\'t match');
    }

    return errors;
}

const mapStateToProps = ({user}) => ({
    initialValues: user.current,
});


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getUser,
        updateUser,
        emptyUser,
    }, dispatch);
}

UserProfileForm = reduxForm({
    validate,
    form: 'UserProfileForm',
})(UserProfileForm);

UserProfileForm = connect(mapStateToProps, mapDispatchToProps)(UserProfileForm);

export default withTranslate(UserProfileForm);
