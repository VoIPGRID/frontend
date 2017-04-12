'use strict'

class MainModule {

    constructor(app) {
        app.router.addRoutes([{
            path: '/login',
            name: 'main_login',
            component: {
                render: app.components.main_login.render,
                data: function() {
                    return {
                        username: 'fooooo',
                        password: 'barrrr',
                    }
                },
            },
        }])
    }
}


module.exports = MainModule
