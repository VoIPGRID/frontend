const Api = require('./lib/api')
const Helpers = require('./lib/helpers')
const Logger = require('./lib/logger')
const globalStore = require('./lib/store')


/**
 * The VoIPGRID frontend V2 application.
 */
class App {
    /**
     * @param {Object} userState - The user state as passed from the backend.
     * @param {Object} templates - The compiled Vue templates to start with.
     */
    constructor(userState, templates) {
        // Assign the template global to the app context.
        this.__state = userState
        this.templates = templates
        this.logger = new Logger(this)

        // Show a meaningful message to the user when the API is down.
        if (!userState) {
            this.logger.error('Received no state. No API backend?')
            return
        }

        Vue.use(Helpers, this)
        this.setupRouter()

        Vue.use(Vuelidate.default)

        this.api = new Api(this)

        userState.selectedPartner = null
        userState.selectedClient = null
        // Keeping the reference to the global store here.
        this.store = globalStore(userState)
        this.initI18n()

        this.loadModules()
        this.modules.main.mountVdom()
    }


    /**
     * Initialize all modules.
     */
    loadModules() {
        this.modules = {}
        let _modules = [
            {name: 'clients', Module: require('./modules/clients')},
            {name: 'dashboard', Module: require('./modules/dashboard')},
            {name: 'partners', Module: require('./modules/partners')},
            {name: 'users', Module: require('./modules/users')},
            {name: 'main', Module: require('./modules/main')},
        ]

        for (let {name, Module} of _modules) {
            this.modules[name] = new Module(this)
        }
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
}

/** @global */
window.app = new App(global.__state, window.templates)
