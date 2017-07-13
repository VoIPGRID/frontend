module.exports = (app) => {
    const template = app.templates.main_breadcrumbs
    /**
     *
     */
    return {
        render: template.r,
        staticRenderFns: template.s,
        store: ['user'],
        // computed: Vuex.mapState({
        //     user: state => state.user,
        // }),
    }
}
