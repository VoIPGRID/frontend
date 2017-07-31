const Module = require('../../lib/module')
/**
 * The Dashboard makes it easy for the user to navigate
 * around the many functionalities of the VoIPGRID platform.
 */
class DashboardModule extends Module {
    /**
     * @param {App} app - The application object.
     */
    constructor(app) {
        super(app)
        this.app.store.dashboard = this.getObservables()
        this.actions = require('./actions')(app)

        app.router.addRoutes([{
            path: '/',
            name: 'dashboard_home',
            component: require('./components/home')(app, this.actions),
        }])
    }


    getObservables() {
        return {
            modules: [],
        }
    }
}


module.exports = DashboardModule
