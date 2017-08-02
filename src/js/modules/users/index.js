const Module = require('../../lib/module')
/**
 * @module user
 */

 /**
  * The user app handles profile-related functionality.
  */
class UsersModule extends Module {
    /**
     * @param {App} app - The application object.
     */
    constructor(app) {
        super(app)
        this.app.store.users = this.getObservables()
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
        let _state = {
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
        }

        Object.assign(_state.user, JSON.parse(JSON.stringify(this.app.__state)))
        return _state
    }
}

module.exports = UsersModule
