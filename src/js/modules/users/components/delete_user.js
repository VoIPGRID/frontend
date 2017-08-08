module.exports = (app, actions) => {
    const template = app.templates.users_delete_user

    return {
        created: async function() {
            let user = await actions.readUser.call(this, app.router.currentRoute.params.user_id)
            this.user = user
        },
        methods: {
            deleteUser: actions.deleteUser,
        },
        render: template.r,
        staticRenderFns: template.s,
        store: {
            user: 'users.currentUser',
        },
    }
}
