const Module = require('../../lib/module')
/**
 * @module clients
 */

/**
 * Module for management of Clients.
 * @memberof module:clients
 */
class ClientsModule extends Module {
    /**
     * Intialize the client module.
     * @param {App} app - The application object.
     */
    constructor(app) {
        super(app)
        if (!this.app.store.clients) this.app.store.clients = this.getObservables()
        this.actions = require('./actions')(app, this)

        const AddEditClient = Vue.component('AddEditClient', require('./components/add-edit_client')(app, this.actions))
        const ListClients = Vue.component('ListClients', require('./components/list_clients')(app, this.actions))
        const DeleteClient = Vue.component('DeleteClient', require('./components/delete_client')(app, this.actions))

        app.router.addRoutes([{
            children: [{
                component: DeleteClient,
                name: 'delete_client',
                path: ':client_id/delete',
            }],
            component: ListClients,
            name: 'list_clients',
            path: '/clients',
        }])

        app.router.addRoutes([{
            component: AddEditClient,
            name: 'add_client',
            path: '/clients/add',
        }])

        app.router.addRoutes([{
            component: AddEditClient,
            name: 'edit_client',
            path: '/clients/:client_id/edit',
        }])
    }


    getObservables() {
        return {
            anonymizeAfter: [],
            audioLanguages: [],
            blockedCallPermissions: [],
            client: {
                billingprofile: {
                    billing_email: '',
                    currency: '',
                    exclude_from_export: false,
                },
                blocked_call_permissions: [],
                description: '',
                foreign_code: '',
                name: '',
                profile: {
                    audio_language: '',
                    country: {
                        code: '',
                    },
                    system_language: '',
                    timezone: '',
                },
            },
            clients: [],
            countries: [],
            currencies: [],
            owners: [],
            systemLanguages: [],
            timezones: [],
        }
    }
}

module.exports = ClientsModule
