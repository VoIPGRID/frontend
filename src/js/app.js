const Api = require('./lib/api')
const Logger = require('./lib/logger')
const Store = require('./lib/store')


/**
* The VoIPGRID frontend V2 application.
*/
class App {
    /**
    * @param {Object} store - The store as passed from the backend.
    * @param {Object} templates - The compiled Vue templates to start with.
    */
    constructor(store, templates) {
        // Assign the template global to the app context.
        this.templates = templates
        this.logger = new Logger(this)

        // Show a meaningful message to the user when the API is down.
        if (!store) {
            this.logger.error('Received no store. No API backend?')
            return
        }

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

        // Initialize the final store from the passed store object.
        this._store = new Store(this, store)
        this.api = new Api(this)
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
        if (global.translations && this.store.user.language in translations) {
            Vue.i18n.add(this.store.user.language, translations.nl)
            Vue.i18n.set(this.store.user.language)
        } else {
            // Warn about a missing language when it's a different one than
            // the default.
            if (this.store.user.language !== 'en') {
                this.logger.warn(`No translations found for ${this.store.user.language}`)
            }
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
                            return c.sealedOptions.asyncData(this.router.currentRoute)
                        } else if (c.asyncData) {
                            return c.asyncData(this.router.currentRoute)
                        } else return null
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
                    return Promise.all(activated.map(c => {
                        if (c.sealedOptions && c.sealedOptions.asyncData) {
                            return c.sealedOptions.asyncData(to)
                        } else if (c.asyncData) {
                            return c.asyncData(to)
                        } else return null
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
