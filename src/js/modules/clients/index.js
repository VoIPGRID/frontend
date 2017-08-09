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
        this.app.store.clients = this.getObservables()
        this.actions = require('./actions')(app, this)

        const AddEditClientComponent = require('./components/add-edit_client')(app, this.actions)

        app.router.addRoutes([{
            children: [
                {
                    component: require('./components/delete_client')(app, this.actions),
                    name: 'delete_client',
                    path: ':client_id/delete',
                },
            ],
            component: require('./components/list_clients')(app, this.actions),
            name: 'list_clients',
            path: '/clients',

        }])

        app.router.addRoutes([{
            component: AddEditClientComponent,
            name: 'add_client',
            path: '/clients/add',
        }])

        app.router.addRoutes([{
            component: AddEditClientComponent,
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
