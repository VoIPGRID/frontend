const globalActions = require('./lib/actions')
const globalMutations = require('./lib/mutations')
const Helpers = require('./lib/helpers')
const Logger = require('./lib/logger')
const Notifications = require('./components/notifications')
const paginator = require('./components/paginator')


/**
 * The VoIPGRID frontend V2 application.
 */
class App {
    /**
     * @param {Object} initialState - The state passed from the backend.
     * @param {Object} templates - The compiled Vue templates to start with.
     */
    constructor(initialState, templates) {
        // Assign the template global to the app context.
        this.templates = templates
        this.logger = new Logger(this)

        // Show a meaningful message to the user when the API is down.
        if (!initialState) {
            this.logger.error('No API backend')
            return
        }

        Vue.use(Helpers, this)
        Vue.use(VueRouter)
        Vue.use(Vuelidate.default)

        Vue.component('paginator', paginator(templates.components_paginator))
        // Holds an array of visited routes.
        this.history = []
        // Remove the base as soon as the new frontend goes primetime.
        this.router = new VueRouter({
            base: '/v2/',
            mode: 'history',
            linkActiveClass: 'is-active',
        })
        // Keep track of the last route for cancel actions and the like.
        this.router.afterEach((to, from) => {
            this.history.push(to)
        })

        // Add the Django csrf token in the header and set the base URL
        // to VoIPGRID api V2.
        /** @memberof App */
        this.api = axios.create({
            baseURL: 'http://localhost/api/v2/',
            timeout: 3000,
            headers: {'X-CSRFToken': initialState.csrf},
        })

        this.modules = this.loadModules()
        this.vuex = this.setupStore()
        this.initI18n()
        // Initialize Notifications component.
        Vue.use(Notifications, this.vuex)
        this.vuex.commit('user/AUTHENTICATE', initialState.authenticated)

        // Start up virtual DOM renderer.
        this.vue = new Vue({
            i18n: this.i18n,
            router: this.router,
            store: this.vuex,
            render: create => create({
                render: this.templates.main_main.r,
                staticRenderFns: this.templates.main_main.s,
            }),
            methods: Vuex.mapActions(['notify']),
        }).$mount('#app')
    }


    /**
     * Initialize all modules.
     * @returns {Object} modules - The module instances.
     */
    loadModules() {
        let modules = {}
        let _modules = [
            {name: 'clients', Module: require('./modules/clients')},
            {name: 'dashboard', Module: require('./modules/dashboard')},
            {name: 'main', Module: require('./modules/main')},
            {name: 'partners', Module: require('./modules/partners')},
            {name: 'user', Module: require('./modules/user')},
        ]

        for (let {name, Module} of _modules) {
            modules[name] = new Module(this)
        }
        return modules
    }


    initI18n() {
        Vue.use(vuexI18n.plugin, this.vuex)
        if (global.translations && __state.language in translations) {
            Vue.i18n.add(__state.language, translations.nl)
            Vue.i18n.set(__state.language)
            this.logger.info(`Set language to ${__state.language}`)
        } else {
            this.logger.warn(`No translations found for ${__state.language}`)
        }
    }


    /**
     * Combines all actions and mutations from modules and add them to
     * their own namespace in the Vuex store. Also add global actions
     * and mutations for generic state.
     * @returns {Vuex.Store} - The Vuex instance.
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

/** @global */
window.app = new App(global.__state, window.templates)
