import {actions} from './actions.mjs'
import {Module} from '../../lib/module.mjs'

import {Modules} from './components/modules.mjs'

/**
 * The Modules plugin show all the platform options the user has.
 */
export class ModulesModule extends Module {
    /**
     * @param {App} app - The application object.
     */
    constructor(app) {
        super(app)
        if (!this.app.store.dashboard) this.app.store.dashboard = this.getObservables()
        this.actions = actions(app)

        app.router.addRoutes([{
            component: Vue.component('Modules', Modules(app, this.actions)),
            name: 'modules',
            path: '/partners/:partner_id/clients/:client_id/modules/',
        }])
    }


    getObservables() {
        return {
            modules: [],
        }
    }
}
