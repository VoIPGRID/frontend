export function Dashboard(app) {
    const template = app.templates.dashboard_dashboard

    return {
        data: function() {
            return {

            }
        },
        render: template.r,
        staticRenderFns: template.s,
    }
}
