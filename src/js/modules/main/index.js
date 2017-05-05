'use strict'


class MainModule {

    constructor(app) {
        this.actions = require('./actions')(app)
        this.mutations = require('./mutations')(app)
        this.state = {
            authenticated: false,
            credentials: {
                email: 'spindle@voipgrid.nl',
                password: 'password123',
            },
        }

        this.methods = {
            notify(notification) {
                this.vuex.actions.notify(notification)
            },
        }

        app.router.addRoutes([{
            path: '/login',
            alias: '/logout',
            name: 'main_login',
            component: require('./components/login')(app),
        }])
    }
}


module.exports = MainModule
