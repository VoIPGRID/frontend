'use strict'

const globalActions = require('./lib/actions')
const globalMutations = require('./lib/mutations')
const Logger = require('./lib/logger')
const Store = require('./lib/store')
const Notifications = require('./lib/notifications')


class App {
    /**
     * The VoIPGRID frontend V2 application class.
     */
    constructor(templates) {
        // Assign the template global to the app context.
        this.templates = templates

        this._modules = [
            {name: 'clients', Module: require('./modules/clients')},
            {name: 'dashboard', Module: require('./modules/dashboard')},
            {name: 'main', Module: require('./modules/main')},
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

        this.modules = this.loadModules()
        this.vuex = this.initStore()

        // Initialize Notifications component.
        Vue.use(Notifications, this.vuex)

        this.vuex.commit('main/AUTHENTICATE', this.store.get('user'))

        // Start up virtual DOM.
        this.vdom = new Vue({
            router: this.router,
            store: this.vuex,
            render: create => create(this.templates.main_main),
            methods: Vuex.mapActions(['notify']),
        }).$mount('#app')

    }


    /**
     * Initialize all modules.
     */
    loadModules() {
        let modules = {}
        for (let {name, Module} of this._modules) {
            modules[name] = new Module(this)
        }
        return modules
    }


    /**
     * Combines all actions and mutations from modules and add them to
     * their own namespace in the Vuex store. Also add global actions
     * and mutations for generic state.
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

        return new Vuex.Store({
            modules: vuexModules,
            actions: globalActions(this),
            mutations: globalMutations(this),
            state: {
                notifications: [],
            },
        })
    }
}

window.app = new App(window.templates)
