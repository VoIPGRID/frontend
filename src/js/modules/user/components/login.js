module.exports = (app) => {
    const template = app.templates.user_login

    return Vue.component('UserLogin', {
        computed: Vuex.mapState({
            credentials: state => state.user.credentials,
            authenticated: state => state.user.authenticated,
        }),
        methods: Vuex.mapActions([
            'login',
        ]),
        render: template.r,
        staticRenderFns: template.s,
    })
}
