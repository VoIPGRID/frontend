'use strict'

const actions = require('./actions')
const LoginComponent = require('./components/login')
const mutations = require('./mutations')


class MainModule {

    constructor(app) {
        this.actions = actions(app)
        this.mutations = mutations(app)

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

        const loginComponent = new LoginComponent(app)
        app.router.addRoutes([{
            path: '/login',
            alias: '/logout',
            name: 'main_login',
            component: loginComponent.component,
        }])
    }
}


module.exports = MainModule
