// Import legacy commonjs modules here.
global.axios = require('axios')
global.Vue = require('vue/dist/vue.runtime')
global.Cookie = require('js-cookie')

if (process.env.NODE_ENV === 'production') {
    Vue.config.productionTip = false
    Vue.config.devtools = false
    // Async/await support in es5.
    global.regeneratorRuntime = require('regenerator-runtime/runtime-module')
}

// Leave this in, otherwise it breaks beforeCreate hooks with SSR.
Vue.use(require('vue-stash').default)
global.VueRouter = require('vue-router')

global.Vuelidate = require('vuelidate')
global.Vuelidate.validators = require('vuelidate/lib/validators')

global.i18n = require('vue-i18n-stash')
global.I18nStore = require('vue-i18n-stash/src/store-stash')
