const Module = require('../../lib/module')

/** @module partners */

/**
 * This module handles partner management.
 */
class PartnersModule extends Module {

    constructor(app) {
        super(app)
        if (!this.app.store.partners) this.app.store.partners = this.getObservables()
        this.actions = require('./actions')(app, this)

        const AddEditPartner = Vue.component('AddEditPartner',
            require('./components/add-edit_partner')(app, this.actions))
        const DeletePartner = Vue.component('DeletePartner', require('./components/delete_partner')(app, this.actions))
        const ListPartners = Vue.component('ListPartners', require('./components/list_partners')(app, this.actions))

        app.router.addRoutes([{
            children: [{
                component: DeletePartner,
                name: 'delete_partner',
                path: '/delete',
            }],
            component: ListPartners,
            name: 'list_partners',
            path: '/partners/:partner_id?',
        }])

        app.router.addRoutes([{
            component: AddEditPartner,
            name: 'add_partner',
            path: '/partners/add',
        }])

        app.router.addRoutes([{
            component: AddEditPartner,
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
