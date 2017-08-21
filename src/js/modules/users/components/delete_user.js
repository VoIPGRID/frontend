module.exports = (app, actions) => {
    const template = app.templates.users_delete_user

    return {
        asyncData: async function(store, route) {
            const clientId = route.params.client_id
            const partnerId = route.params.partner_id
            const userId = route.params.user_id

            let userData = await actions.readUser(clientId, partnerId, userId)
            Object.assign(store.users, userData)
            return userData
        },
        methods: {
            deleteUser: actions.deleteUser,
            fetchData: async function() {
                const route = app.router.currentRoute
                const clientId = route.params.client_id
                const partnerId = route.params.partner_id
                const userId = route.params.user_id
                Object.assign(this, await actions.readUser(clientId, partnerId, userId))
            },
        },
        render: template.r,
        staticRenderFns: template.s,
        store: {
            user: 'users.user',
        },
        watch: {
            $route: 'fetchData',
        },
    }
}
