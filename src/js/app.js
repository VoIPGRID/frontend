const Api = require('./lib/api')
const Logger = require('./lib/logger')
const Store = require('./lib/store')


/**
 * The VoIPGRID frontend V2 application.
 */
class App {
    /**
     * @param {Object} initialState - The user state as passed from the backend.
     * @param {Object} templates - The compiled Vue templates to start with.
     */
    constructor(initialState, templates) {
        // Assign the template global to the app context.
        this.__state = initialState
        this.templates = templates
        this.logger = new Logger(this)

        this.env = {
            isBrowser: false,
            isNode: false,
            ssr: true,
        }

        if (global.navigator) this.env.isBrowser = true
        else this.env.isNode = true

        if (global.location && global.location.pathname.includes('/v2/')) {
            this.env.ssr = false
        }

        // Show a meaningful message to the user when the API is down.
        if (!initialState) {
            this.logger.error('Received no state. No API backend?')
            return
        }
        this.utils = require('./lib/helpers')(this)
        const _this = this
        Vue.use((Vue) => {
            /** @memberof App */
            if (!Vue.prototype.hasOwnProperty('$helpers')) {
                Object.defineProperties(Vue.prototype, {
                    $helpers: {
                        get() {
                            return _this.utils
                        },
                    },
                })
            }

        })
        this.setupRouter()
        // Initialize form validator here.
        Vue.use(Vuelidate.default)
        this.api = new Api(this)

        this._store = new Store(this, initialState)
        this.initI18n()

        this.loadModules()
        this.modules.main.initViewModel()
    }


    /**
     * Initialize all modules.
     */
    loadModules() {
        this.modules = {}
        let _modules = [
            {Module: require('./modules/clients'), name: 'clients'},
            {Module: require('./modules/dashboard'), name: 'dashboard'},
            {Module: require('./modules/partners'), name: 'partners'},
            {Module: require('./modules/users'), name: 'users'},
            {Module: require('./modules/main'), name: 'main'},
        ]

        for (let {name, Module} of _modules) {
            this.modules[name] = new Module(this)
        }
    }


    initI18n() {
        // Create a I18n stash store and pass it to the I18n plugin.
        const i18nStore = new I18nStore(this.store)
        Vue.use(i18n, i18nStore)
        if (global.translations && this.__state.language in translations) {
            Vue.i18n.add(this.__state.language, translations.nl)
            Vue.i18n.set(this.__state.language)
        } else {
            // Warn about a missing language when it's a different one than
            // the default.
            if (this.__state.language !== 'en') this.logger.warn(`No translations found for ${this.__state.language}`)
        }
        // Add a simple reference to the translation module.
        this.$t = Vue.i18n.translate
    }


    setupRouter() {
        // Holds an array of visited routes.
        this.history = []
        Vue.use(VueRouter)

        let baseUrl
        if (this.env.ssr) baseUrl = '/ssr/'
        else baseUrl = '/v2/'

        this.router = new VueRouter({
            base: baseUrl,
            linkActiveClass: 'is-active',
            mode: 'history',
        })
        // Keep track of the last route for cancel actions and the like.
        this.router.afterEach((to, from) => {
            this.history.push(to)
        })

        if (this.env.isBrowser) {
            this.router.onReady(() => {
                // Add router hook for handling asyncData. Doing it after
                // initial route is resolved so that we don't double-fetch the
                // data that we already have. Using `router.beforeResolve()`
                // so that all async components are resolved.
                if (!this.env.ssr) {
                    const activated = this.router.getMatchedComponents(this.router.currentRoute)
                    Promise.all(activated.map(c => {
                        if (c.sealedOptions && c.sealedOptions.asyncData) {
                            return c.sealedOptions.asyncData(this.store, this.router.currentRoute)
                        } else if (c.asyncData) {
                            return c.asyncData(this.store, this.router.currentRoute)
                        }
                    }))
                }

                this.router.beforeResolve((to, from, next) => {
                    const matched = this.router.getMatchedComponents(to)
                    const prevMatched = this.router.getMatchedComponents(from)

                    // We only care about none-previously-rendered components,
                    // so we compare them until the two matched lists differ.
                    let diffed = false
                    const activated = matched.filter((c, i) => {
                        return diffed || (diffed = (prevMatched[i] !== c))
                    })

                    if (!activated.length) {
                        return next()
                    }

                    // This is where we should trigger a loading indicator
                    // if there is one.
                    Promise.all(activated.map(c => {
                        if (c.sealedOptions && c.sealedOptions.asyncData) {
                            return c.sealedOptions.asyncData(this.store, to)
                        } else if (c.asyncData) {
                            return c.asyncData(this.store, to)
                        }
                    })).then(() => {
                        // Stop loading indicator.
                        next()
                    }).catch(next)
                })
            })
        }
    }
}

module.exports = App
