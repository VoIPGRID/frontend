module.exports = (app) => {
    const template = app.templates.dashboard_dashboard

    return Vue.component('DashboardHome', {
        data: function() {
            return {

            }
        },
        render: template.r,
        staticRenderFns: template.s,
    })
}
