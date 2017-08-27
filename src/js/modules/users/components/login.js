module.exports = (app, actions) => {
    const template = app.templates.users_login
    const v = Vuelidate.validators

    return Vue.component('UserLogin', {
        methods: {
            login: actions.login,
        },
        render: template.r,
        staticRenderFns: template.s,
        store: {
            authenticated: 'users.user.authenticated',
            credentials: 'users.credentials',
            root: 'users',
            user: 'users.user',
        },
        validations: function() {
            return {
                credentials: {
                    email: {
                        email: v.email,
                        required: v.required,
                    },
                    password: {
                        minLength: v.minLength(6),
                        required: v.required,
                    },
                },
            }
        },
    })
}
