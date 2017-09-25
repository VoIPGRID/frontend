import {actions} from './actions.mjs'
import {Module} from '../../lib/module.mjs'

import {AddEditClient} from './components/add-edit_client.mjs'
import {ListClients} from './components/list_clients.mjs'
import {DeleteClient} from './components/delete_client.mjs'


/**
 * @module clients
 */

/**
 * Module for management of Clients.
 * @memberof module:clients
 */
export class ClientsModule extends Module {
    /**
     * Intialize the client module.
     * @param {App} app - The application object.
     */
    constructor(app) {
        super(app)
        if (!this.app.store.clients) this.app.store.clients = this.getObservables()
        this.actions = actions(app, this)

        const addEditClient = Vue.component('AddEditClient', AddEditClient(app, this.actions))
        const listClients = Vue.component('ListClients', ListClients(app, this.actions))
        const deleteClient = Vue.component('DeleteClient', DeleteClient(app, this.actions))

        // Order is important for this route to take precedence.
        app.router.addRoutes([{
            component: addEditClient,
            name: 'add_client',
            path: '/partners/:partner_id/clients/add',
        }])

        app.router.addRoutes([{
            children: [{
                component: deleteClient,
                name: 'delete_client',
                path: 'delete',
            }],
            component: listClients,
            meta: {
                breadcrumbs: ['Clients'],
            },
            name: 'list_clients',
            path: '/partners/:partner_id',
        }])

        app.router.addRoutes([{
            component: addEditClient,
            name: 'edit_client',
            path: '/partners/:partner_id/clients/:client_id/edit',
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
