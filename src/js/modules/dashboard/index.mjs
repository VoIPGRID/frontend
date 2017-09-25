import {actions} from './actions.mjs'
import {Module} from '../../lib/module.mjs'

import {Dashboard} from './components/dashboard.mjs'

/**
 * The Dashboard makes it easy for the user to navigate
 * around the many functionalities of the VoIPGRID platform.
 */
export class DashboardModule extends Module {
    /**
     * @param {App} app - The application object.
     */
    constructor(app) {
        super(app)
        if (!this.app.store.dashboard) this.app.store.dashboard = this.getObservables()
        this.actions = actions(app)

        const dashboard = Vue.component('Dashboard', Dashboard(app, this.actions))

        // This is the default view for a selected client context.
        app.router.addRoutes([{
            component: dashboard,
            meta: {
                breadcrumbs: ['Dashboard'],
            },
            name: 'dashboard_client',
            path: '/partners/:partner_id/clients/:client_id/',
        }])

        // The default view for the selected partner context is the client list;
        // not the dashboard view.
        app.router.addRoutes([{
            component: dashboard,
            meta: {
                breadcrumbs: ['Dashboard'],
            },
            name: 'dashboard_partner',
            path: '/partners/:partner_id/dashboard/',
        }])
    }


    getObservables() {
        return {
            modules: [],
        }
    }
}
