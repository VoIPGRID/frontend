'use strict'

module.exports = (app, module) => {
    return Vue.component('home', {
        render: app.templates.dashboard_home.render,
        staticRenderFns: app.templates.dashboard_home.staticRenderFns,
        computed: Vuex.mapState({
            modules: state => state.dashboard.modules,
        }),
    })
}
