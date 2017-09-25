import {ClientsModule} from './modules/clients/index.mjs'
import {DashboardModule} from './modules/dashboard/index.mjs'
import {ModulesModule} from './modules/modules/index.mjs'
import {PartnersModule} from './modules/partners/index.mjs'
import {UsersModule} from './modules/users/index.mjs'
import {GeneralModule} from './modules/general/index.mjs'
import {PhoneaccountsModule} from './modules/phoneaccounts/index.mjs'

import {Api} from './lib/api.mjs'
import {helpers} from './lib/helpers.mjs'
import {Logger} from './lib/logger.mjs'
import {Store} from './lib/store.mjs'

/**
* The VoIPGRID frontend V2 application.
*/
export class App {
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
        }

        if (global.navigator) this.env.isBrowser = true
        else this.env.isNode = true

        this.utils = helpers(this)
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

        // Initialize form validator here.
        Vue.use(Vuelidate.default)

        // Initialize the final store from the passed store object.
        this._store = new Store(this, store)

        this.setupRouter()
        this.api = new Api(this)
        this.initI18n()

        this.loadModules()
        this.modules.general.initViewModel()
    }


    /**
    * Find the current route's matching components and gather all
    * state that's defined in it's `asyncData` methods. This is done
    * here, because SSR doesn't have all of the components's lifecycle
    * hooks, and we need a common way to gather state from components.
    */
    async loadHookData() {
        const matchedComponents = this.router.getMatchedComponents()
        try {
            await Promise.all(matchedComponents.map(Component => {
                if (Component.sealedOptions && Component.sealedOptions.asyncData) {
                    return Component.sealedOptions.asyncData(this.router.currentRoute)
                } else if (Component.asyncData) {
                    return Component.asyncData(this.router.currentRoute)
                } else return null
            }))
        } catch (error) {
            console.trace(error)
        }
    }


    /**
    * Initialize all modules.
    */
    loadModules() {
        this.modules = {}

        let _modules = [
            {Module: ClientsModule, name: 'clients'},
            {Module: DashboardModule, name: 'dashboard'},
            {Module: ModulesModule, name: 'modules'},
            {Module: PartnersModule, name: 'partners'},
            {Module: UsersModule, name: 'users'},
            {Module: GeneralModule, name: 'general'},
            {Module: PhoneaccountsModule, name: 'phoneaccounts'},
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

        this.router = new VueRouter({
            base: '/v2/',
            linkActiveClass: 'is-active',
            mode: 'history',
        })

        // Keep track of the last route for cancel actions and the like.
        this.router.beforeEach((to, from, next) => {
            this.history.push(to)
            // Set the breadcrumbs.
            if (to.meta.breadcrumbs) {
                this.store.breadcrumbs = to.meta.breadcrumbs
            }

            // Unset selected client/partner on these routes.
            if (to.name === 'list_clients') {
                this.store.user.selectedClient = {id: null, name: ''}
            } else if (to.name === 'list_partners') {
                this.store.user.selectedClient = {id: null, name: ''}
                this.store.user.selectedPartner = {id: null, name: ''}
            }

            return next()
        })

        this.router.onReady(async() => {
            // Retrieve the state on pageload in case we are rendering in
            // a browser in non-SSR mode.
            if (!this.store.ssr) await this.loadHookData()

            this.router.beforeResolve((to, from, next) => {
                const matched = this.router.getMatchedComponents(to)
                const prevMatched = this.router.getMatchedComponents(from)

                // We only care about none-previously-rendered components,
                // so we compare them until the two matched lists differ.
                let diffed = false
                const activated = matched.filter((c, i) => {
                    return diffed || (diffed = (prevMatched[i] !== c))
                })

                if (!activated.length) return next()

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
