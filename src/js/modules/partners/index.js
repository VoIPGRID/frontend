/** @module partners */

/**
 * This module handles partner management.
 */
class PartnersApp {

    constructor(app) {
        this.actions = require('./actions')(app)
        this.mutations = require('./mutations')(app)
        this.state = {
            audioLanguages: [],
            countries: [],
            currencies: [],
            owners: [],
            partner: {
                name: '',
                description: '',
                domain: '',
                email_address: '',
                foreign_code: '',
                may_have_children: false,
                no_reply_email_address: '',
                registration_domain: '',
                text: '',
                brand: '',
                navlink: '',
                navlink_active: '',
                spot: '',
                btn_text: '',
                wiki_base_url: '',
                profile: {},
                billingprofile: {},
            },
            partners: [],
            systemLanguages: [],
            timezones: [],
        }

        app.router.addRoutes([{
            path: '/partners',
            name: 'list_partners',
            component: require('./components/list_partners')(app),
            children: [
                {
                    path: ':partner_id/delete',
                    name: 'delete_partner',
                    component: require('./components/delete_partner')(app),
                },
            ],
        }])

        const AddEditPartnerComponent = require('./components/add-edit_partner')(app)

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
}

module.exports = PartnersApp
