/**
 * The Dashboard makes it easy for the user to navigate
 * around the many functionalities of the VoIPGRID platform.
 */
class DashboardApp {
    /**
     * @param {App} app - The application object.
     */
    constructor(app) {
        this.actions = require('./actions')(app)
        this.mutations = require('./mutations')(app)
        // let $t = Vue.i18n.translate
        this.state = {
            modules: [],
        }

        app.router.addRoutes([{
            path: '/',
            name: 'dashboard_home',
            component: require('./components/home')(app),
        }])
    }
}


module.exports = DashboardApp
