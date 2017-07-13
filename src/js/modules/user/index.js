/**
 * @module user
 */

 /**
  * The user app handles profile-related functionality.
  */
class UserApp {
    /**
     * @param {App} app - The application object.
     */
    constructor(app) {
        // this.actions = require('./actions')(app)
        // this.mutations = require('./mutations')(app)

        this.state = {
            authenticated: false,
            credentials: {
                email: '',
                password: '',
            },
            user: {
                profile: {},
            },
            selectedPartner: null,
        }

        app.router.addRoutes([{
            path: '/login',
            alias: '/logout',
            name: 'user_login',
            component: require('./components/login')(app),
        }])

        app.router.addRoutes([{
            path: '/profile',
            name: 'user_profile',
            component: require('./components/profile')(app),
        }])
    }
}

module.exports = UserApp
