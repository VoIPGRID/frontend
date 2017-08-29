const Module = require('../../lib/module')
/**
 * @module main
 */

/**
 * The main app handles generic functionality that doesn't
 * fall in a distinct category.
 */
class MainModule extends Module {
    /**
     * @param {App} app - The application object.
     */
    constructor(app) {
        super(app)
        this.actions = require('./actions')(app, this)

        Vue.component('Breadcrumbs', require('./components/breadcrumbs')(app, this.actions))
        Vue.component('Field', require('./components/field')(app, this.actions))
        Vue.component('Navigation', require('./components/navigation')(app, this.actions))
        Vue.component('ContentHeader', require('./components/content_header')(app, this.actions))

        const Oops = Vue.component('Oops', require('./components/oops')(app))

        if (!this.app.store.main) this.app.store.main = this.getObservables()
        app.router.addRoutes([{
            component: Oops,
            name: 'oops',
            path: '/oops',
        }])
    }

    /**
    * Start up the Vue viewmodel.
    */
    initViewModel() {
        const mainComponent = Vue.component('Main', {
            render: this.app.templates.main_main.r,
            staticRenderFns: this.app.templates.main_main.s,
            store: {
                shouts: 'shouts',
                user: 'user',
            },
        })

        this.app.vm = new Vue({
            data: {
                store: this.app.store,
            },
            i18n: this.app.i18n,
            render: h => h(mainComponent),
            router: this.app.router,
        })

        if (this.app.env.isBrowser) {
            this.app.vm.$mount(document.querySelector('#app'))
        }
    }

    getObservables() {
        return {
            apiValidation: false,
        }
    }
}


module.exports = MainModule
