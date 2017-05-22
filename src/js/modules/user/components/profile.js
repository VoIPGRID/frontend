module.exports = (app) => {
    const template = app.templates.user_profile
    return Vue.component('UserProfile', {
        render: template.r,
        staticRenderFns: template.s,
        computed: Vuex.mapState({
            credentials: state => state.user.credentials,
            authenticated: state => state.user.authenticated,
        }),
        methods: Vuex.mapActions([
            'login',
        ]),
    })
}
