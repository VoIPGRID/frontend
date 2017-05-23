global.axios = require('axios')
global.Vue = require('vue/dist/vue.runtime')
if (process.env.NODE_ENV === 'production') {
    Vue.config.productionTip = false
    Vue.config.devtools = false
    // Async/await support in es5.
    global.regeneratorRuntime = require('regenerator-runtime/runtime-module')
}

global.Vuex = require('vuex')
global.VueRouter = require('vue-router')
global.Vuelidate = require('vuelidate')
global.Vuelidate.validators = require('vuelidate/lib/validators')
global.vuexI18n = require('vuex-i18n')

const {Tabs, Tab} = require('vue-tabcordion')
const {Paginator} = require('vue-paginator2')
const {Shout, Shouts, vuex} = require('vue-shout')

// Actions and mutations from components are mixed in
// the application's global Vuex store.
global._Vuex = vuex

Vue.component('paginator', Paginator)
Vue.component('Shout', Shout)
Vue.component('Shouts', Shouts)
Vue.component('Tab', Tab)
Vue.component('Tabs', Tabs)
