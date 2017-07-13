const Api = require('./lib/api')
const globalActions = require('./lib/actions')
const globalMutations = require('./lib/mutations')
const Helpers = require('./lib/helpers')
const Logger = require('./lib/logger')
const globalStore = require('./lib/store')


/**
 * The VoIPGRID frontend V2 application.
 */
class App {
    /**
     * @param {Object} state - The state passed from the backend.
     * @param {Object} templates - The compiled Vue templates to start with.
     */
    constructor(state, templates) {
        // Assign the template global to the app context.
        this.templates = templates
        this.logger = new Logger(this)

        // Show a meaningful message to the user when the API is down.
        if (!state) {
            this.logger.error('No API backend')
            return
        }

        Vue.use(Helpers, this)
        this.setupRouter()

        Vue.use(Vuelidate.default)

        this.api = new Api(this, state)

        state.selectedPartner = null
        // Keeping the reference to the global store here.
        this.store = globalStore(state)
        this.modules = this.loadModules()
        this.initI18n()

        // Start up virtual DOM renderer.
        this.vue = new Vue({
            i18n: this.i18n,
            router: this.router,
            data: () => {
                return {
                    store: this.store,
                }
            },
            render: createElement => createElement({
                render: this.templates.main_main.r,
                staticRenderFns: this.templates.main_main.s,
                store: ['user', 'shouts'],
                // computed: Vuex.mapState({
                //     user: state => state.user,
                //     selectedPartner: state => state.user.selectedPartner,
                // }),
            }),
            // methods: Vuex.mapActions(['notify']),
        }).$mount('#app')


        // if (initialState.authenticated) {
        //     this.vuex.commit('user/SET_USER', initialState)
        // }

        // this.vuex.commit('user/AUTHENTICATE', initialState.authenticated)
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
        // Create a I18n stash store and pass it to the I18n plugin.
        const i18nStore = new I18nStore(this.store)
        Vue.use(i18n, i18nStore)
        if (global.translations && __state.language in translations) {
            Vue.i18n.add(__state.language, translations.nl)
            Vue.i18n.set(__state.language)
            this.logger.info(`Set language to ${__state.language}`)
        } else {
            // Warn about a missing language when it's a different one than
            // the default.
            if (__state.language !== 'en') this.logger.warn(`No translations found for ${__state.language}`)
        }
        // Add a simple reference to the translation module.
        this.$t = Vue.i18n.translate
    }


    setupRouter() {
        // Holds an array of visited routes.
        this.history = []
        Vue.use(VueRouter)
        // TODO: Clear the base url as soon as we ditched the hybrid situation.
        this.router = new VueRouter({
            base: '/v2/',
            mode: 'history',
            linkActiveClass: 'is-active',
        })
        // Keep track of the last route for cancel actions and the like.
        this.router.afterEach((to, from) => {
            this.history.push(to)
        })
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
            state: Object.assign({}, _Vuex.state),
        })
    }
}

/** @global */
window.app = new App(global.__state, window.templates)
