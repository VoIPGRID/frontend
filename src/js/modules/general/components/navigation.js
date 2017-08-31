module.exports = (app, actions) => {
    const template = app.templates.general_navigation

    return {
        methods: {
            logout: app.modules.users.actions.logout,
        },
        render: template.r,
        staticRenderFns: template.s,
        store: {
            user: 'user',
        },
    }
}
