const Module = require('../../lib/module')
/**
 * @module general
 */

/**
 * The general app handles generic functionality that doesn't
 * fall in a distinct category.
 */
class GeneralModule extends Module {
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

        if (!this.app.store.general) this.app.store.general = this.getObservables()

        app.router.addRoutes([{
            path: '/',
            redirect: to => {
                if (!this.app.store.user.authenticated) {
                    return {name: 'user_login'}
                }

                if (this.app.store.user.partner) {
                    const selectedPartner = this.app.store.user.selectedPartner
                    return {name: 'list_clients', params: {partner_id: selectedPartner.id}}
                } else {
                    const selectedClient = this.app.store.user.selectedClient
                    return {
                        name: 'dashboard_client',
                        params: {
                            client_id: selectedClient.id,
                            partner_id: selectedClient.owner.id,
                        },
                    }
                }
            },
        }])

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
        const template = this.app.templates.general_main
        const mainComponent = Vue.component('Main', {
            render: template.r,
            staticRenderFns: template.s,
            store: {
                notifications: 'notifications',
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


module.exports = GeneralModule
