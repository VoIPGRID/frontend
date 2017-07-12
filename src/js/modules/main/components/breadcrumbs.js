module.exports = (app) => {
    const template = app.templates.main_breadcrumbs
    /**
     *
     */
    return {
        render: template.r,
        staticRenderFns: template.s,
        computed: Vuex.mapState({
            user: state => state.user,
        }),
    }
}
