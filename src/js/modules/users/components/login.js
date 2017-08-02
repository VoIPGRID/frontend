module.exports = (app, actions) => {
    const template = app.templates.users_login

    return Vue.component('UserLogin', {
        methods: {
            login: actions.login,
        },
        render: template.r,
        staticRenderFns: template.s,
        store: {
            authenticated: 'users.user.authenticated',
            credentials: 'users.credentials',
            user: 'users.user',
            root: 'users',
        },
    })
}
