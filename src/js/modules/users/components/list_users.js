module.exports = (app, actions) => {
    const template = app.templates.users_list_users
    return {
        methods: {
            readUsers: actions.readUsers,
        },
        render: template.r,
        staticRenderFns: template.s,
        store: {
            users: 'users.users',
            client: '1',
        },
    }
}
