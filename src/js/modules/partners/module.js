'use strict'

class PartnerModule {

    constructor(app) {

        app.router.addRoutes([{
            path: '/partners',
            name: 'partners_index',
            component: app.components.partners_index,
        }])
    }
}

module.exports = PartnerModule
