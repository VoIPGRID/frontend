import {actions} from './actions.mjs'
import {Module} from '../../lib/module.mjs'

import {AddEditPhoneaccount} from './components/add-edit_phoneaccount.mjs'
import {DeletePhoneaccount} from './components/delete_phoneaccount.mjs'
import {ListPhoneaccounts} from './components/list_phoneaccounts.mjs'


/**
 * @module clients
 */

/**
 * Module for management of Clients.
 * @memberof module:clients
 */
export class PhoneaccountsModule extends Module {
    /**
     * Intialize the client module.
     * @param {App} app - The application object.
     */
    constructor(app) {
        super(app)
        if (!this.app.store.phoneaccounts) this.app.store.phoneaccounts = this.getObservables()
        this.actions = actions(app, this)

        const addEditPhoneaccount = Vue.component('AddEditPhoneaccount', AddEditPhoneaccount(app, this.actions))
        const deletePhoneaccount = Vue.component('DeletePhoneaccount', DeletePhoneaccount(app, this.actions))
        const listPhoneaccounts = Vue.component('ListPhoneaccounts', ListPhoneaccounts(app, this.actions))

        // Order is important for this route to take precedence.
        app.router.addRoutes([{
            component: addEditPhoneaccount,
            name: 'add_phoneaccount',
            path: '/partners/:partner_id/clients/:client_id/phoneaccounts/add',
        }])

        app.router.addRoutes([{
            children: [{
                component: deletePhoneaccount,
                name: 'delete_phoneaccount',
                path: ':phoneaccount_id/delete',
            }],
            component: listPhoneaccounts,
            name: 'list_phoneaccounts',
            path: '/partners/:partner_id/clients/:client_id/phoneaccounts',
        }])

        app.router.addRoutes([{
            component: addEditPhoneaccount,
            name: 'edit_phoneaccount',
            path: '/partners/:partner_id/clients/:client_id/phoneaccounts/:phoneaccount_id/edit',
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
