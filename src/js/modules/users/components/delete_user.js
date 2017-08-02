module.exports = (app, actions) => {
    const template = app.templates.users_delete_user
    return {
        methods: {
            deleteClient: actions.deleteClient,
        },
        mounted: function() {
            actions.readUser(this.$store.users, app.router.currentRoute.params.client_id)
        },
        render: template.r,
        staticRenderFns: template.s,
        store: {
            user: 'users.user',
        },
    }
}
