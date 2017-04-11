'use strict'

class ClientModule {

    constructor(app) {
        app.router.addRoutes([{
            path: '/clients',
            name: 'list',
            component: app.components.clients_list,
        }])
    }
}


module.exports = ClientModule
