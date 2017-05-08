module.exports = (app) => {
    const template = app.templates.dashboard_home
    return Vue.component('DashboardHome', {
        render: template.render,
        staticRenderFns: template.staticRenderFns,
        computed: Vuex.mapState({
            modules: state => state.dashboard.modules,
        }),
    })
}
