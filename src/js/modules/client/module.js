'use strict'

class ClientModule {

    constructor(app) {
        this.components = {
            list: require('./components/list.vue'),
        }
        app.router.addRoutes([
            {
                path: '/',
                name: 'list',
                component: this.components.list,
            },
        ]
)
    }
}


module.exports = ClientModule
