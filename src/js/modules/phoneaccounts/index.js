const Module = require('../../lib/module')
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
            path: '/partners/:partner_id/clients/:client_id/phoneaccounts/add',
        }])

        app.router.addRoutes([{
            children: [{
                component: DeletePhoneaccount,
                name: 'delete_phoneaccount',
                path: ':phoneaccount_id/delete',
            }],
            component: ListPhoneaccounts,
            name: 'list_phoneaccounts',
            path: '/partners/:partner_id/clients/:client_id/phoneaccounts',
        }])

        app.router.addRoutes([{
            component: AddEditPhoneaccount,
            name: 'edit_phoneaccount',
            path: '/partners/:partner_id/clients/:client_id/phoneaccounts/:phoneaccount_id/edit',
        }])
    }


    getObservables() {
        return {
            phoneaccount: {

            },
            phoneaccounts: [],
        }
    }
}

module.exports = PhoneaccountsModule
