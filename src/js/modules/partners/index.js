const Module = require('../../lib/module')

/** @module partners */

/**
 * This module handles partner management.
 */
class PartnersModule extends Module {

    constructor(app) {
        super(app)
        this.app.store.partners = this.getObservables()
        this.actions = require('./actions')(app, this)

        app.router.addRoutes([{
            path: '/partners',
            name: 'list_partners',
            component: require('./components/list_partners')(app, this.actions),
            children: [
                {
                    path: ':partner_id/delete',
                    name: 'delete_partner',
                    component: require('./components/delete_partner')(app, this.actions),
                },
            ],
        }])

        const AddEditPartnerComponent = require('./components/add-edit_partner')(app, this.actions)

        app.router.addRoutes([{
            path: '/partners/add',
            name: 'add_partner',
            component: AddEditPartnerComponent,
        }])

        app.router.addRoutes([{
            path: '/partners/:partner_id/edit',
            name: 'edit_partner',
            component: AddEditPartnerComponent,
        }])
    }


    getObservables() {
        return {
            audioLanguages: [],
            countries: [],
            currencies: [],
            owners: [],
            partner: {
                billingprofile: {
                    auto_export: false,
                    billing_email: '',
                    currency: '',
                    exclude_from_export: false,
                    totalize_partner_cdrs: false,
                    use_twinfield: false,
                },
                brand: '',
                btn_text: '',
                description: '',
                domain: '',
                email_address: '',
                foreign_code: '',
                may_have_children: false,
                navlink: '',
                navlink_active: '',
                name: '',
                no_reply_email_address: '',
                profile: {
                    audio_language: '',
                    country: {
                        code: '',
                    },
                    system_language: '',
                    timezone: '',
                },
                registration_domain: '',
                spot: '',
                text: '',
                wiki_base_url: '',
            },
            partners: [],
            priceplanDiscounts: [],
            systemLanguages: [],
            timezones: [],
        }
    }
}

module.exports = PartnersModule
