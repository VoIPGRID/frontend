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
        this.actions = require('./actions')(app)
        this.mutations = require('./mutations')(app)

        this.state = {
            authenticated: false,
            credentials: {
                email: '',
                password: '',
            },
        }

        app.router.addRoutes([{
            path: '/login',
            alias: '/logout',
            name: 'user_login',
            component: require('./components/login')(app),
        }])
    }
}

module.exports = UserApp
