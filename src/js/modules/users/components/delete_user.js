module.exports = (app, actions) => {
    const template = app.templates.users_delete_user

    return {
        created: function() {
            this.fetchData()
        },
        methods: {
            deleteUser: actions.deleteUser,
            fetchData: async function() {
                const userId = app.router.currentRoute.params.user_id
                this.user = await actions.readUser.call(this, userId)
            },
        },
        render: template.r,
        staticRenderFns: template.s,
        store: {
            user: 'users.currentUser',
        },
        watch: {
            $route: 'fetchData',
        },
    }
}
