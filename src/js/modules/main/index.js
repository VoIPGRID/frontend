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

        Vue.component('Field', require('./components/field')(app, this.actions))
        Vue.component('Navigation', require('./components/navigation')(app, this.actions))
        Vue.component('ContentHeader', require('./components/content_header')(app, this.actions))

        this.app.store.main = this.getObservables()

        app.router.addRoutes([{
            component: require('./components/oops')(app),
            name: 'oops',
            path: '/oops',
        }])
    }


    mountVdom() {
        // Start up virtual DOM renderer.
        const mainComponent = Vue.component('Main', {
            render: this.app.templates.main_main.r,
            staticRenderFns: this.app.templates.main_main.s,
            store: {
                shouts: 'shouts',
                user: 'users.user',
            },
        })

        this.app.vue = new Vue({
            data: {
                store: this.app.store,
            },
            i18n: this.app.i18n,
            render: h => h(mainComponent),
            router: this.app.router,
        })

        if (this.app.env.isBrowser) {
            this.app.vue.$mount(document.querySelector('#app'))
        }

    }


    getObservables() {
        return {
            apiValidation: false,
        }
    }
}


module.exports = MainModule
