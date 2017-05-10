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
    constructor(initialState, templates) {
        // Assign the template global to the app context.
        this.templates = templates
        this.utils = require('./lib/utils')(this)
        this.logger = new Logger(this)
        // Show a meaningful message to the user when the API is down.
        if (!initialState) {
            this.logger.error('No API backend')
            return
        }

        Vue.use(Helpers, this)
        Vue.use(VueRouter)

        Vue.component('paginator', Paginator)

        // Holds an array of visited routes.
        this.history = []
        this.router = new VueRouter({
            mode: 'history',
            linkActiveClass: 'is-active',
        })
        // Keep track of the last route for cancel actions and the like.
        this.router.afterEach((to, from) => {
            this.history.push(to)
        })

        // Add the Django csrf token in the header and set the base URL
        // to VoIPGRID api V2.
        this.api = axios.create({
            baseURL: 'http://localhost/api/v2/',
            timeout: 3000,
            headers: {'X-CSRFToken': initialState.csrf},
        })

        this.modules = this.loadModules()
        this.vuex = this.setupStore()
        // Initialize Notifications component.
        Vue.use(Notifications, this.vuex)
        this.vuex.commit('main/AUTHENTICATE', initialState.authenticated)

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

window.app = new App(global.__state, window.templates)
