global.axios = require('axios')
global.Vue = require('vue/dist/vue.runtime')

if (process.env.NODE_ENV === 'production') {
    Vue.config.productionTip = false
    Vue.config.devtools = false
    // Async/await support in es5.
    global.regeneratorRuntime = require('regenerator-runtime/runtime-module')
}

global.VueStash = require('vue-stash').default

// Leave this in, otherwise it breaks beforeCreate hooks with SSR.
Vue.use(global.VueStash)
global.VueRouter = require('vue-router')

global.Vuelidate = require('vuelidate')
global.Vuelidate.validators = require('vuelidate/lib/validators')

global.i18n = require('vue-i18n-stash')
global.I18nStore = require('vue-i18n-stash/src/store-stash')

const {Tabs, Tab} = require('fuet-tabs')
const Pagination = require('fuet-pagination')
const {Notification, Notifications, FuetNotify} = require('fuet-notify')

Vue.use(FuetNotify)

Vue.component('Pagination', Pagination)
Vue.component('Notification', Notification)
Vue.component('Notifications', Notifications)
Vue.component('Tab', Tab)
Vue.component('Tabs', Tabs)
