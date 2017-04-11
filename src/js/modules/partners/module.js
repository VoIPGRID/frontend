'use strict'

class PartnerModule {

    constructor(app) {
        app.router.addRoutes([{
            path: '/partners',
            name: 'list',
            component: app.components.partners_list,
        }])
    }
}

module.exports = PartnerModule
