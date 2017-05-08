const globalActions = require('./lib/actions')
const globalMutations = require('./lib/mutations')
const Helpers = require('./lib/helpers')
const Logger = require('./lib/logger')
const Notifications = require('./components/notifications')
const Paginator = require('./components/paginator')

/**
 * The VoIPGRID frontend V2 application class.
 */
class App {
    /**
     * @param {Object} templates - The compiled Vue templates to start with.
     */
    constructor(templates) {
        // Assign the template global to the app context.
        this.templates = templates
        this.logger = new Logger(this)
        this.utils = require('./lib/utils')


        Vue.use(Helpers)
        Vue.use(VueRouter)
        Vue.use(VeeValidate, {
            enableAutoClasses: true,
            errorBagName: 'errors',
            fieldsBagName: 'fields',
            delay: 0,
            locale: 'en',
            classNames: {
                touched: 'touched',
                untouched: 'untouched',
                valid: 'valid',
                invalid: 'invalid',
                pristine: 'pristine',
                dirty: 'dirty',
            },
        })

        Vue.component('paginator', Paginator)

        this.router = new VueRouter({
            mode: 'history',
            linkActiveClass: 'is-active',
        })

        // Add the Django csrf token in the header and set the base URL
        // to VoIPGRID api V2.
        this.api = axios.create({
            baseURL: 'http://localhost/api/v2/',
            timeout: 3000,
            headers: {'X-CSRFToken': __state.csrf},
        })

        this.modules = this.loadModules()
        this.vuex = this.setupStore()

        // Initialize Notifications component.
        Vue.use(Notifications, this.vuex)

        this.vuex.commit('main/AUTHENTICATE', __state.authenticated)

        // Start up virtual DOM renderer.
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
        let _modules = [
            {name: 'clients', Module: require('./modules/clients')},
            {name: 'dashboard', Module: require('./modules/dashboard')},
            {name: 'main', Module: require('./modules/main')},
            {name: 'partners', Module: require('./modules/partners')},
        ]

        for (let {name, Module} of _modules) {
            modules[name] = new Module(this)
        }
        return modules
    }


    /**
     * Combines all actions and mutations from modules and add them to
     * their own namespace in the Vuex store. Also add global actions
     * and mutations for generic state.
     */
    setupStore() {
        let vuexModules = {}
        for (let name of Object.keys(this.modules)) {
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
