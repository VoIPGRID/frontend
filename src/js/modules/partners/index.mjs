import {actions} from './actions.mjs'
import {Module} from '../../lib/module.mjs'

import {AddEditPartner} from './components/add-edit_partner.mjs'
import {DeletePartner} from './components/delete_partner.mjs'
import {ListPartners} from './components/list_partners.mjs'


/** @module partners */

/**
 * This module handles partner management.
 */
export class PartnersModule extends Module {

    constructor(app) {
        super(app)
        if (!this.app.store.partners) this.app.store.partners = this.getObservables()
        this.actions = actions(app, this)

        const addEditPartner = Vue.component('AddEditPartner', AddEditPartner(app, this.actions))
        const deletePartner = Vue.component('DeletePartner', DeletePartner(app, this.actions))
        const listPartners = Vue.component('ListPartners', ListPartners(app, this.actions))

        // Order is important for this route to take precedence.
        app.router.addRoutes([{
            component: addEditPartner,
            name: 'add_partner',
            path: '/partners/add',
        }])

        app.router.addRoutes([{
            children: [{
                component: deletePartner,
                name: 'delete_partner',
                path: 'delete',
            }],
            component: listPartners,
            meta: {
                breadcrumbs: ['Partners'],
            },
            name: 'list_partners',
            path: '/partners/:partner_id?',
        }])

        app.router.addRoutes([{
            component: addEditPartner,
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
