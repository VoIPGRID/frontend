'use strict'

class ClientModule {

    constructor(app) {
        app.router.addRoutes([{
            path: '/clients',
            name: 'clients_index',
            component: app.components.clients_index,
        }])
    }
}


module.exports = ClientModule
