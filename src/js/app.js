'use strict'

const Logger = require('./lib/logger')
const Store = require('./lib/store')


class App {
    /**
     * The VoIPGRID frontend V2 application class.
     */
    constructor(templates) {
        // Assign the template global to the app context.
        this.templates = templates

        this._modules = [
            {name: 'main', Module: require('./modules/main')},
            {name: 'clients', Module: require('./modules/clients')},
            {name: 'partners', Module: require('./modules/partners')},
        ]

        Vue.use(VueRouter)
        Vue.use(VeeValidate, {
            enableAutoClasses: true,
            errorBagName: 'errors', // change if property conflicts.
            fieldsBagName: 'fields',
            delay: 0,
            locale: 'en',
            classNames: {
                touched: 'touched', // the control has been blurred
                untouched: 'untouched', // the control hasn't been blurred
                valid: 'valid', // model is valid
                invalid: 'invalid', // model is invalid
                pristine: 'pristine', // control has not been interacted with
                dirty: 'dirty', // control has been interacted with
            },
        })

        this.router = new VueRouter({
            mode: 'history',
            linkActiveClass: 'is-active',
        })

        // Add the Django csrf token in the header and set the base URL
        // for our API.
        this.api = axios.create({
            baseURL: 'http://localhost/api/v2/',
            timeout: 1000,
            headers: {'X-CSRFToken': csrf},
        })
        this.logger = new Logger(this)
        this.store = new Store(this)


        this.loadModules()

        this.initStore()

        this.vuex.commit('main/AUTHENTICATE', this.store.get('user'))

        // Start up virtual DOM.
        this.vdom = new Vue({
            router: this.router,
            store: this.vuex,
            render: create => create(this.templates.main_main),
        }).$mount('#app')

    }


    /**
     * Initialize all modules.
     */
    loadModules() {
        this.modules = {}
        for (let {name, Module} of this._modules) {
            this.modules[name] = new Module(this)
        }
    }


    /**
     * Combines all actions and mutations from modules
     * and init a Vuex store.
     */
    initStore() {
        let vuexModules = {}

        for (let {name} of this._modules) {
            let {actions, mutations, state} = this.modules[name]
            if (actions || mutations || state) {
                vuexModules[name] = {
                    actions: actions,
                    mutations: mutations,
                    namespaced: true,
                    state: state,
                }
            }
        }

        this.vuex = new Vuex.Store({
            modules: vuexModules,
        })
    }
}

window.app = new App(window.templates)
