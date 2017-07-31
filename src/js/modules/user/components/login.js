module.exports = (app, actions) => {
    const template = app.templates.user_login

    return Vue.component('UserLogin', {
        methods: {
            login: actions.login,
        },
        render: template.r,
        staticRenderFns: template.s,
        store: {
            authenticated: 'user.authenticated',
            credentials: 'user.credentials',
            root: 'user',
        },
    })
}
