'use strict'


/**
 * This module handles client moderation.
 */
class ClientsModule {

    constructor(app) {
        this.actions = require('./actions')(app)
        this.mutations = require('./mutations')(app)
        this.state = {
            clients: [],
            client: {},
        }

        app.router.addRoutes([{
            path: '/clients',
            name: 'list_clients',
            component: require('./components/list_clients')(app),
            children: [
                {
                    path: ':client_id/delete',
                    name: 'delete_client',
                    component: require('./components/delete_client')(app),
                },
            ],
        }])

        app.router.addRoutes([{
            path: '/clients/add',
            name: 'add_client',
            component: require('./components/add_client')(app),
        }])

        app.router.addRoutes([{
            path: '/clients/:client_id/edit',
            name: 'edit_client',
            component: require('./components/edit_client')(app),
        }])
    }
}

module.exports = ClientsModule
