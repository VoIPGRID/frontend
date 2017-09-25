export function DeleteUser(app, actions) {
    const template = app.templates.users_delete_user

    async function asyncData(route) {
        const clientId = route.params.client_id
        const partnerId = route.params.partner_id
        const userId = route.params.user_id

        let userData = await actions.readUser(clientId, partnerId, userId)
        Object.assign(app.store.users, userData)
        return userData
    }

    return {
        asyncData: function(route) {
            return asyncData.call(this, route)
        },
        computed: {
            backUrl: function() {
                if (this.$route.params.client_id) {
                    return {name: 'list_client_users', params: this.$route.params}
                } else {
                    return {name: 'list_partner_users', params: this.$route.params}
                }
            },
        },
        methods: {
            deleteUser: actions.deleteUser,
        },
        render: template.r,
        staticRenderFns: template.s,
        store: {
            user: 'users.user',
        },
        watch: {
            $route: function(to, from) {
                asyncData.call(this, to)
            },
        },
    }
}
