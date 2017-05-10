module.exports = (app) => {
    const template = app.templates.dashboard_home
    return Vue.component('DashboardHome', {
        render: template.r,
        staticRenderFns: template.s,
        computed: Vuex.mapState({
            modules: state => state.dashboard.modules,
        }),
    })
}
