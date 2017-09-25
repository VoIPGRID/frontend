import {actions} from './actions.mjs'
import {Module} from '../../lib/module.mjs'

import {Breadcrumbs} from './components/breadcrumbs.mjs'
import {ContentHeader} from './components/content_header.mjs'
import {Field} from './components/field.mjs'
import {Navigation} from './components/navigation.mjs'
import {Oops} from './components/oops.mjs'


/**
 * @module general
 */

/**
 * The general app handles generic functionality that doesn't
 * fall in a distinct category.
 */
export class GeneralModule extends Module {
    /**
     * @param {App} app - The application object.
     */
    constructor(app) {
        super(app)
        this.actions = actions(app, this)

        Vue.component('Breadcrumbs', Breadcrumbs(app, this.actions))
        Vue.component('Field', Field(app, this.actions))
        Vue.component('Navigation', Navigation(app, this.actions))
        Vue.component('ContentHeader', ContentHeader(app, this.actions))

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
            component: Vue.component('Oops', Oops(app)),
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
