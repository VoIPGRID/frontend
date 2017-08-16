const Select = require('react-select');
const classNames = require('classnames');

import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

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
                element = <input className={className} type={field.type} {...field.input} />;
                break;
            case 'textarea':
                element = <textarea className={className} type={field.type} {...field.input} />;
                break;
            case 'select':
                element = (
                    <Select.Async {...field.input}
                        loadOptions={field.loadOptions}
                        onBlur={() => field.input.onBlur(field.input.value.value)} />
                )
                break;
            case 'checkbox':
                element = <input className={className} type={field.type} {...field.input} />;
                break;
            default:
                break;
        }

        return (
            <div className="field">
                <label className={labelClass}>{field.label}</label>
                <div className="control">
                    {element}

                    {
                        field.helpText &&
                            <p className="help">{field.helpText}</p>
                    }
                </div>


                {touched && error &&
                    <p className="help is-danger">{error}</p>
                }
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

    async _handleSubmit(values) {
        let response;

        if (values.id) {
            response = await this.props.updatePartner(values);
        } else {
            response = await this.props.createPartner(values);
        }

        const { status } = response.payload;

        if (status === 200 || status === 201) {
            this.props.history.push('/partners');
        } else {
            console.log('Error');
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
                            <h2>Any content 2</h2>
                        </TabPanel>

                        <TabPanel>
                            <h2>Any content 3</h2>
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

    if (!values.name) {
        errors.name = 'Please enter a name';
    }

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
