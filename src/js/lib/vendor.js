global.axios = require('axios')
global.Vue = require('vue/dist/vue.runtime')

if (process.env.NODE_ENV === 'production') {
    Vue.config.productionTip = false
    Vue.config.devtools = false
    // Async/await support in es5.
    global.regeneratorRuntime = require('regenerator-runtime/runtime-module')
}

global.VueStash = require('vue-stash')
// Leave this in, otherwise it breaks beforeCreate hooks with SSR.
Vue.use(global.VueStash)
global.VueRouter = require('vue-router')

global.Vuelidate = require('vuelidate')
global.Vuelidate.validators = require('vuelidate/lib/validators')

global.i18n = require('vue-i18n-stash')
global.I18nStore = require('vue-i18n-stash/src/store-stash')

const {Tabs, Tab} = require('vue-tabcordion')
global.Paginator = require('vue-paginator2')

const {Shout, Shouts, VueShout} = require('vue-shout')

Vue.use(VueShout)

Vue.component('Paginator', global.Paginator)
Vue.component('Shout', Shout)
Vue.component('Shouts', Shouts)
Vue.component('Tab', Tab)
Vue.component('Tabs', Tabs)
