const Select = require('react-select');
const classNames = require('classnames');

import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { timezones} from '../helpers/timezones';

import { getPartners, createPartner, getPartner, updatePartner, emptyPartner } from './PartnerActions';

class PartnerForm extends Component {
    constructor(props) {
        super(props);

        this._handleSubmit = this._handleSubmit.bind(this);
        this._getPartnerOptions = this._getPartnerOptions.bind(this);
    }

    async componentDidMount() {
        const { id } = this.props.match.params;

        if (id) {
            await this.props.getPartner(id);
        }
    }

    componentWillUnmount() {
        this.props.emptyPartner();
    }

    renderField(field) {
        const { meta: { touched, error }} = field;
        let className = field.type;

        if (field.type === 'text') {
            className = 'input';
        }

        // Bulma has the name class names as the type of input (e.g. input, textarea).
        // So just reuse that determine what element to render.
        let element = className;

        className = classNames(
            className,
            {
                'is-danger': touched && error,
            }
        )

        let labelClass = classNames(
            'label',
            {
                'is-required': field.required,
            }
        )

        switch (element) {
            case 'input':
                element = <input className={className} disabled={field.disabled} type={field.type} {...field.input} />;
                break;
            case 'textarea':
                element = <textarea className={className} disabled={field.disabled} type={field.type} {...field.input} />;
                break;
            case 'select':
                element = (
                    <Select.Async {...field.input}
                        loadOptions={field.loadOptions}
                        disabled={field.disabled}
                        onBlur={() => field.input.onBlur(field.input.value.value)} />
                )
                break;
            case 'checkbox':
                element = <input className={className} disabled={field.disabled} type={field.type} {...field.input} />;
                break;
            default:
                break;
        }

        return (
            <div className="field">
                <label className={labelClass}>{field.label}</label>
                <div className="control">
                    {element}

                    { field.helpText &&
                        <p className="help">{field.helpText}</p>
                    }

                    { touched && error &&
                        <p className="help is-danger">{error}</p>
                    }
                </div>
            </div>
        )
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

    async _getSystemLanguages() {
        const options = [
            {value: '', label: '-----'},
            {value: 'nl', label: 'Dutch'},
            {value: 'en', label: 'English'},
        ]

        return { options };
    }

    async _getAudioLanguages() {
        const options = [
            {value: 'vg_af_ZA_F', label: 'Afrikaans, female'},
            {value: 'vg_af_ZA_M', label: 'Afrikaans, male'},
            {value: 'vg_nl_BE_F', label: 'Dutch (Belgium), female'},
            {value: 'vg_nl_BE_M', label: 'Dutch (Belgium), male'},
            {value: 'vg_nl_NL_F', label: 'Dutch (Netherlands), female'},
            {value: 'vg_nl_NL_M', label: 'Dutch (Netherlands), male'},
            {value: 'vg_en_UK_F', label: 'English, female'},
            {value: 'vg_en_UK_M', label: 'English, male'},
            {value: 'vg_fr_FR_F', label: 'French, female'},
            {value: 'vg_fr_FR_M', label: 'French, male'},
            {value: 'vg_de_DE_F', label: 'German, female'},
            {value: 'vg_de_DE_M', label: 'German, male'},
            {value: 'vg_it_IT_F', label: 'Italian, female'},
            {value: 'vg_it_IT_M', label: 'Italian, male'},
            {value: 'vg_es_ES_F', label: 'Spanish, female'},
            {value: 'vg_es_ES_M', label: 'Spanish, male'},
        ]

        return { options };
    }

    async _getTimeZones() {
        let options = timezones.map((timezone) => {
            return {value: timezone, label: timezone};
        });

        return {options};
    }

    async _getCurrencies() {
        const options = [
            {value: 1, label: 'EUR (€)'},
            {value: 2, label: 'ZAR (R)'},
        ]

        return { options };
    }

    async _getPriceplanDiscountStatuses() {
        const options = [
            {value: 1, label: 'Special Price'},
            {value: 2, label: 'Wholesale'},
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
                    <Tabs className="tabs is-boxed" selectedTabClassName="is-active">
                        <TabList>
                            <Tab><a>Partner</a></Tab>
                            <Tab><a>Preferences</a></Tab>
                            <Tab><a>Billing preferences</a></Tab>
                        </TabList>

                        <TabPanel>
                            <h2 className="subtitle">General</h2>
                            <Field label="Owner" name="owner" helpText="This allows for reseller-style relationships. Set to NULL for the system owner." type="select" required="true" component={this.renderField} loadOptions={this._getPartnerOptions} />
                            <Field label="Name" name="name" helpText="The relation name: a company name or a person name in case of a private person." type="text" required="true" component={this.renderField} />
                            <Field label="Description" name="description" type="textarea" component={this.renderField} />
                            <Field label="Foreign code" name="foreign_code" helpText="A human readable identifier that the relation uses to identify you by." type="text" component={this.renderField} />
                            <Field label="May have children" name="may_have_children" type="checkbox" component={this.renderField} />

                            <h2 className="subtitle">Domains</h2>
                            <Field label="Domain" name="domain" type="text" helpText="E.g. your.hostname" component={this.renderField} />
                            <Field label="Email address" name="email_address" type="text" component={this.renderField} />
                            <Field label="No-reply email address" name="no_reply_email_address" helpText="Address to be used for sending out notifications." type="text" component={this.renderField} />
                            <Field label="Wiki base url" name="wiki_base_url" helpText="E.g. https://wiki.voipgrid.nl/index.php/" type="text" component={this.renderField} />
                            <Field label="Registration domain" name="registration_domain" helpText="The domain name client phones use as proxy address. E.g. proxy_hostname" type="text" component={this.renderField} />

                            <h2 className="subtitle">Branding</h2>
                        </TabPanel>

                        <TabPanel>
                            <Field label="Country" name="profile[country][code]" helpText="Select the country you operate from. When possible this country will be the default in other forms." type="select" required="true" component={this.renderField} loadOptions={this._getCountries} />
                            <Field label="Audio language" name="profile[audio_language]" helpText="Select the language/voice that is used as default for messages played in modules." type="select" required="true" component={this.renderField} loadOptions={this._getAudioLanguages} />
                            <Field label="System language" name="profile[system_language]" helpText="Select the language that is used as default for printed text (invoices, exports, interface)." type="select" required="true" component={this.renderField} loadOptions={this._getSystemLanguages} />
                            <Field label="Timezone" name="profile[timezone]" type="select" required="true" component={this.renderField} loadOptions={this._getTimeZones} />
                        </TabPanel>

                        <TabPanel>
                            <Field label="Timezone" name="billingprofile[currency]" type="select" required="true" component={this.renderField} loadOptions={this._getCurrencies} />
                            <Field label="Email address for billing" name="billingprofile[billing_email]" helpText="You can set this email address at the billing information page." disabled type="text" component={this.renderField} />
                            <Field label="Does its own billing" helpText="When checked, this partner receives a single invoice from the system for all its clients. Otherwise, its clients receive invoices from the system." name="billingprofile[totalize_partner_cdrs]" type="checkbox" component={this.renderField} />
                            <Field label="Use Twinfield" helpText="When checked, the partner can export his billing items to twinfield" name="billingprofile[use_twinfield]" type="checkbox" component={this.renderField} />
                            <Field label="Automatic export" helpText="A combined export will be created and emailed on the first day of every month." name="billingprofile[auto_export]" type="checkbox" component={this.renderField} />
                            <Field label="Exclude from billing" helpText="This relation will be excluded from billing exports." name="billingprofile[exclude_from_export]" type="checkbox" component={this.renderField} />
                            <Field label="Priceplan discount status" name="billingprofile[priceplan_discount_status]" type="select" component={this.renderField} loadOptions={this._getPriceplanDiscountStatuses} />
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
