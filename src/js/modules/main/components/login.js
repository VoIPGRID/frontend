module.exports = (app) => {
    const template = app.templates.main_login
    return Vue.component('MainLogin', {
        render: template.r,
        staticRenderFns: template.s,
        computed: Vuex.mapState({
            credentials: state => state.main.credentials,
            authenticated: state => state.main.authenticated,
        }),
        methods: Vuex.mapActions([
            'login',
        ]),
    })
}
