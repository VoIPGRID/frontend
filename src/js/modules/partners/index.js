const Module = require('../../lib/module')

/** @module partners */

/**
 * This module handles partner management.
 */
class PartnersModule extends Module {

    constructor(app) {
        super(app)
        // Only set observables when they're not yet set from the initial store.
        if (!this.app.store.partners) this.app.store.partners = this.getObservables()
        this.actions = require('./actions')(app, this)

        app.router.addRoutes([{
            children: [
                {
                    component: require('./components/delete_partner')(app, this.actions),
                    name: 'delete_partner',
                    path: ':partner_id/delete',
                },
            ],
            component: require('./components/list_partners')(app, this.actions),
            name: 'list_partners',
            path: '/partners',

        }])

        const AddEditPartnerComponent = require('./components/add-edit_partner')(app, this.actions)

        app.router.addRoutes([{
            alias: [
                '/partners/add/partner',
                '/partners/add/preferences',
                '/partners/add/billing',
            ],
            component: AddEditPartnerComponent,
            name: 'add_partner',
            path: '/partners/add',
        }])

        app.router.addRoutes([{
            alias: [
                '/partners/:partner_id/edit/partner',
                '/partners/:partner_id/edit/preferences',
                '/partners/:partner_id/edit/billing',
            ],
            component: AddEditPartnerComponent,
            name: 'edit_partner',
            path: '/partners/:partner_id/edit',
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
                name: '',
                navlink: '',
                navlink_active: '',
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
