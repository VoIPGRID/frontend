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
        if (!this.app.store.dashboard) this.app.store.dashboard = this.getObservables()
        this.actions = require('./actions')(app)

        const Dashboard = Vue.component('Dashboard', require('./components/dashboard')(app, this.actions))

        app.router.addRoutes([{
            component: Dashboard,
            meta: {
                breadcrumb: 'Dashboard',
            },
            name: 'dashboard_home',
            path: '/partners/:partner_id/clients/:client_id/',
        }])
    }


    getObservables() {
        return {
            modules: [],
        }
    }
}


module.exports = DashboardModule
