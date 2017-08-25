import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import renderField from '../helpers/forms/RenderField';

import { getSelectOptions } from '../helpers/forms/SelectOptions';

import { getPartners, createPartner, getPartner, updatePartner, emptyPartner } from './PartnerActions';

class PartnerForm extends Component {
    constructor(props) {
        super(props);

        this._handleSubmit = this._handleSubmit.bind(this);
        this._getPartnerOptions = this._getPartnerOptions.bind(this);
    }

    async componentDidMount() {
        const { partnerId } = this.props.match.params;

        if (partnerId) {
            await this.props.getPartner(partnerId);
        }
    }

    componentWillUnmount() {
        this.props.emptyPartner();
    }

    async _getPartnerOptions(searchString) {
        await this.props.getPartners(searchString);

        let options = this.props.partners.map(partner => {
            return {value: partner.id, label: partner.name};
        });

        return { options };
    }

    async _getCurrencies() {
        const options = [
            {value: 1, label: 'EUR (€)'},
            {value: 2, label: 'ZAR (R)'},
        ]

        return { options };
    }

    async _handleSubmit(values) {
        let response;

        if (values.id) {
            response = await this.props.updatePartner(values);
        } else {
            response = await this.props.createPartner(values);
        }

        const { status } = response.payload;

        if (status === 200 || status === 201) {
            this.props.history.push("/partners");
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
                            <Tab><a>Partner</a></Tab>
                            <Tab><a>Preferences</a></Tab>
                            <Tab><a>Billing preferences</a></Tab>
                        </TabList>

                        <TabPanel>
                            <h2 className="subtitle">General</h2>
                            <Field label="Owner" name="owner" helpText="This allows for reseller-style relationships. Set to NULL for the system owner." type="select" required="true" component={renderField} loadOptions={this._getPartnerOptions} />
                            <Field label="Name" name="name" helpText="The relation name: a company name or a person name in case of a private person." type="text" required="true" component={renderField} />
                            <Field label="Description" name="description" type="textarea" component={renderField} />
                            <Field label="Foreign code" name="foreign_code" helpText="A human readable identifier that the relation uses to identify you by." type="text" component={renderField} />
                            <Field label="May have children" name="may_have_children" type="checkbox" component={renderField} />

                            <h2 className="subtitle">Domains</h2>
                            <Field label="Domain" name="domain" type="text" helpText="E.g. your.hostname" component={renderField} />
                            <Field label="Email address" name="email_address" type="text" component={renderField} />
                            <Field label="No-reply email address" name="no_reply_email_address" helpText="Address to be used for sending out notifications." type="text" component={renderField} />
                            <Field label="Wiki base url" name="wiki_base_url" helpText="E.g. https://wiki.voipgrid.nl/index.php/" type="text" component={renderField} />
                            <Field label="Registration domain" name="registration_domain" helpText="The domain name client phones use as proxy address. E.g. proxy_hostname" type="text" component={renderField} />

                            <h2 className="subtitle">Branding</h2>
                        </TabPanel>

                        <TabPanel>
                            <Field label="Country" name="profile[country][code]" helpText="Select the country you operate from. When possible this country will be the default in other forms." type="select" required="true" component={renderField} loadOptions={getSelectOptions.bind(this, 'clients/countries', 'code')} />
                            <Field label="Audio language" name="profile[audio_language]" helpText="Select the language/voice that is used as default for messages played in modules." type="select" required="true" component={renderField} loadOptions={getSelectOptions.bind(this, 'clients/audio_languages')} />
                            <Field label="System language" name="profile[system_language]" helpText="Select the language that is used as default for printed text (invoices, exports, interface)." type="select" required="true" component={renderField} loadOptions={getSelectOptions.bind(this, 'clients/system_languages')} />
                            <Field label="Timezone" name="profile[timezone]" type="select" required="true" component={renderField} loadOptions={getSelectOptions.bind(this, 'clients/timezones')} />
                        </TabPanel>

                        <TabPanel>
                            <Field label="Timezone" name="billingprofile[currency]" type="select" required="true" component={renderField} loadOptions={this._getCurrencies} />
                            <Field label="Email address for billing" name="billingprofile[billing_email]" helpText="You can set this email address at the billing information page." disabled type="text" component={renderField} />
                            <Field label="Does its own billing" helpText="When checked, this partner receives a single invoice from the system for all its clients. Otherwise, its clients receive invoices from the system." name="billingprofile[totalize_partner_cdrs]" type="checkbox" component={renderField} />
                            <Field label="Use Twinfield" helpText="When checked, the partner can export his billing items to twinfield" name="billingprofile[use_twinfield]" type="checkbox" component={renderField} />
                            <Field label="Automatic export" helpText="A combined export will be created and emailed on the first day of every month." name="billingprofile[auto_export]" type="checkbox" component={renderField} />
                            <Field label="Exclude from billing" helpText="This relation will be excluded from billing exports." name="billingprofile[exclude_from_export]" type="checkbox" component={renderField} />
                            <Field label="Priceplan discount status" name="billingprofile[priceplan_discount_status]" type="select" component={renderField} loadOptions={getSelectOptions.bind(this, 'partners/priceplan_discounts')} />
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

    // if (!values.partner) {
    //     errors.partner = 'Please enter an owner';
    // }

    // if (!values.name) {
    //     errors.name = 'Please enter a name';
    // }

    return errors;
}

function mapStateToProps({ partners }) {
    return {
        initialValues: partners.current,
        partners: partners.objects,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getPartners,
        createPartner,
        getPartner,
        updatePartner,
        emptyPartner,
    }, dispatch);
}

PartnerForm = reduxForm({
    validate,
    form: 'PartnerForm'
})(PartnerForm);

PartnerForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(PartnerForm);

export default PartnerForm;
