const Module = require('../../lib/module')
/**
 * @module clients
 */

/**
 * Handles VoIPGRID client management.
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
            path: '/clients',
            name: 'list_clients',
            component: require('./components/list_clients')(app, this.actions),
            children: [
                {
                    path: ':client_id/delete',
                    name: 'delete_client',
                    component: require('./components/delete_client')(app, this.actions),
                },
            ],
        }])

        app.router.addRoutes([{
            path: '/clients/add',
            name: 'add_client',
            component: AddEditClientComponent,
        }])

        app.router.addRoutes([{
            path: '/clients/:client_id/edit',
            name: 'edit_client',
            component: AddEditClientComponent,
        }])
    }


    getObservables() {
        return {
            anonymizeAfter: [],
            audioLanguages: [],
            blockedCallPermissions: [],
            countries: [],
            currencies: [],
            client: {
                billingprofile: {
                    currency: '',
                    billing_email: '',
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
            owners: [],
            systemLanguages: [],
            timezones: [],
        }
    }
}

module.exports = ClientsModule
