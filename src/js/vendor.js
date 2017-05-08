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
global.VeeValidate = require('vee-validate')
