'use strict'

const actions = require('./actions')
const mutations = require('./mutations')

const AddClientComponent = require('./components/add_client')
const DeleteClientComponent = require('./components/delete_client')
const EditClientComponent = require('./components/edit_client')
const ListClientsComponent = require('./components/list_clients')


/**
 * This module handles client moderation.
 */
class ClientsModule {

    constructor(app) {
        this.actions = actions(app)
        this.mutations = mutations(app)

        const addClientComponent = new AddClientComponent(app)
        const deleteClientComponent = new DeleteClientComponent(app)
        const editClientComponent = new EditClientComponent(app)
        const listClientsComponent = new ListClientsComponent(app)

        this.state = {
            clients: [],
            client: {},
        }

        app.router.addRoutes([{
            path: '/clients',
            name: 'list_clients',
            component: listClientsComponent.component,
            children: [
                {
                    path: ':client_id/delete',
                    name: 'delete_client',
                    component: deleteClientComponent.component,
                },
            ],
        }])

        app.router.addRoutes([{
            path: '/clients/add',
            name: 'add_client',
            component: addClientComponent.component,
        }])

        app.router.addRoutes([{
            path: '/clients/:client_id/edit',
            name: 'edit_client',
            component: editClientComponent.component,
        }])
    }
}

module.exports = ClientsModule
