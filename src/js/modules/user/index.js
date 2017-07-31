const Module = require('../../lib/module')
/**
 * @module user
 */

 /**
  * The user app handles profile-related functionality.
  */
class UserModule extends Module {
    /**
     * @param {App} app - The application object.
     */
    constructor(app) {
        super(app)
        this.app.store.user = this.getObservables()
        this.actions = require('./actions')(app, this)

        app.router.addRoutes([{
            path: '/login',
            alias: '/logout',
            name: 'user_login',
            component: require('./components/login')(app, this.actions),
        }])

        app.router.addRoutes([{
            path: '/profile',
            name: 'user_profile',
            component: require('./components/profile')(app, this.actions),
        }])
    }


    getObservables() {
        return Object.assign(JSON.parse(JSON.stringify(__state)), {
            user: {
                profile: {},
                old_password: '',
                password: '',
                password_confirm: '',
            },
            credentials: {
                email: '',
                password: '',
            },
        })
    }
}

module.exports = UserModule
