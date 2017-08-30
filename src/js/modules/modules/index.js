const Module = require('../../lib/module')
/**
 * The Modules plugin show all the platform options the user has.
 */
class ModulesModule extends Module {
    /**
     * @param {App} app - The application object.
     */
    constructor(app) {
        super(app)
        if (!this.app.store.dashboard) this.app.store.dashboard = this.getObservables()
        this.actions = require('./actions')(app)

        const Modules = Vue.component('Modules', require('./components/modules')(app, this.actions))

        app.router.addRoutes([{
            component: Modules,
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


module.exports = ModulesModule
