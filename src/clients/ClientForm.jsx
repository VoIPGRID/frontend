import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import renderField from '../helpers/forms/RenderField';

import { getPartners } from '../partners/PartnerActions';
import { getClient, updateClient, emptyClient, createClient } from './ClientActions';

class ClientForm extends Component {
    constructor(props) {
        super(props);

        this._handleSubmit = this._handleSubmit.bind(this);
        this._getPartnerOptions = this._getPartnerOptions.bind(this);
    }

    async componentDidMount() {
        console.log(this.props.match.params)
        const { clientId } = this.props.match.params;

        if (clientId) {
            await this.props.getClient(clientId);
        }
    }

    componentWillUnmount() {
        this.props.emptyClient();
    }

    async _getPartnerOptions(searchString) {
        await this.props.getPartners(searchString);

        let options = this.props.partners.map(partner => {
            return {value: partner.id, label: partner.name};
        });

        return { options };
    }

    async _getCountries() {

        const options = [
            {value: 'nl', label: 'Netherlands'},
            {value: 'de', label: 'Germany'},
            {value: 'za', label: 'South Africa'},
        ]

        return { options };
    }

    async _handleSubmit(values) {
        let response;

        if (values.id) {
            response = await this.props.updateClient(values);
        } else {
            response = await this.props.createClient(values);
        }

        const { status } = response.payload;

        if (status === 200 || status === 201) {
            this.props.history.push("/clients");
        } else {
            // Loop over errors and throw a new SubmissionError for every field
            // that has an error.
            response.payload.errors.map((err) => {
                let error = {};
                error[err.field] = err.message;
                throw new SubmissionError(error)
            })
        }
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <div>
                <form onSubmit={handleSubmit(this._handleSubmit)}>
                    <Tabs className="tabs is-boxed" selectedTabClassName="is-active" forceRenderTabPanel>
                        <TabList>
                            <Tab><a>Client</a></Tab>
                            <Tab><a>Preferences</a></Tab>
                            <Tab><a>Billing preferences</a></Tab>
                        </TabList>

                        <TabPanel>
                            <h2 className="subtitle">General</h2>
                            <Field label="Owner" name="owner" helpText="This allows for reseller-style relationships. Set to NULL for the system owner." type="select" required="true" component={renderField} loadOptions={this._getPartnerOptions} />
                            <Field label="Name" name="name" helpText="The relation name: a company name or a person name in case of a private person." type="text" required="true" component={renderField} />
                            <Field label="Name" name="foreign_code" disabled="true" helpText="A human readable identifier that the relation uses to identify you by." type="text" required="true" component={renderField} />
                            <Field label="Description" name="description" type="textarea" component={renderField} />

                        </TabPanel>

                        <TabPanel>

                        </TabPanel>

                        <TabPanel>

                        </TabPanel>
                    </Tabs>

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

function validate(values) {
    let errors = {};

    return errors;
}

function mapStateToProps({ clients, partners }) {
    return {
        initialValues: clients.current,
        partners: partners.objects,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getPartners,
        createClient,
        getClient,
        updateClient,
        emptyClient,
    }, dispatch);
}

ClientForm = reduxForm({
    validate,
    form: 'ClientForm'
})(ClientForm);

ClientForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientForm);

export default ClientForm;
