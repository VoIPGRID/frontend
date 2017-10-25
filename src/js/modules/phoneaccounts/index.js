const Module = require('../../lib/module')
const $t = Vue.i18n.translate

/**
 * @module clients
 */

/**
 * Module for management of Clients.
 * @memberof module:clients
 */
class PhoneaccountsModule extends Module {
    /**
     * Intialize the client module.
     * @param {App} app - The application object.
     */
    constructor(app) {
        super(app)

        if (!this.app.store.phoneaccounts) this.app.store.phoneaccounts = this.getObservables()
        this.actions = require('./actions')(app, this)

        const AddEditPhoneaccount = Vue.component('AddEditPhoneaccount', require('./components/add-edit_phoneaccount')(app, this.actions))
        const DeletePhoneaccount = Vue.component('DeletePhoneaccount', require('./components/delete_phoneaccount')(app, this.actions))
        const ListPhoneaccounts = Vue.component('ListPhoneaccounts', require('./components/list_phoneaccounts')(app, this.actions))

        // Order is important for this route to take precedence.
        app.router.addRoutes([{
            component: AddEditPhoneaccount,
            name: 'add_phoneaccount',
            path: '/partners/:partner_id/clients/:client_id/modules/phoneaccounts/add',
        }])

        app.router.addRoutes([{
            children: [{
                component: DeletePhoneaccount,
                meta: {
                    breadcrumbs: [$t('Modules'), $t('VoIP accounts'), $t('Delete')],
                },
                name: 'delete_phoneaccount',
                path: ':phoneaccount_id/delete',
            }],
            component: ListPhoneaccounts,
            meta: {
                breadcrumbs: [$t('Modules'), $t('VoIP accounts')],
            },
            name: 'list_phoneaccounts',
            path: '/partners/:partner_id/clients/:client_id/modules/phoneaccounts',
        }])

        app.router.addRoutes([{
            component: AddEditPhoneaccount,
            meta: {
                breadcrumbs: [$t('Modules'), $t('VoIP accounts'), $t('Edit')],
            },
            name: 'edit_phoneaccount',
            path: '/partners/:partner_id/clients/:client_id/modules/phoneaccounts/:phoneaccount_id/edit',
        }])
    }


    getObservables() {
        return {
            calling_codes: [],
            phoneaccount: {
                // For now use a random value. This should be supplied by
                // a simple endpoint.
                // TODO: Use and describe endpoint.
                account_id: Math.floor(Math.random() * (129600000 - 129500000 + 1)) + 129500000,
                callerid_name: '',
                callerid_number: '',
                country: {
                    code: null,
                },
                description: '',
                id: null,
                internal_number: null,
                n112_region: {
                    id: null,
                },
                password: Math.random().toString(36).substring(5, 15) + Math.random().toString(36).substring(6, 15),
            },
            phoneaccounts: [],
            regions_112: [],
        }
    }
}

module.exports = PhoneaccountsModule
