export function ListUsers(app, actions) {
    const template = app.templates.users_list_users
    return {
        asyncData: async function(route) {
            // return the Promise from the action
            let apiPath
            const partnerId = route.params.partner_id
            const clientId = route.params.client_id
            if (clientId) apiPath = `/clients/${clientId}/users/`
            else apiPath = `/partners/${partnerId}/users/`

            let usersData = await actions.readUsers({
                page: parseInt(route.query.page) || 1,
                path: apiPath,
            })

            app.store.users.users = usersData
            return usersData
        },
        computed: {
            clientOrPartner: function() {
                if (this.clientId) return 'client'
                return 'partner'
            },
            resourceUrl: function() {
                if (this.clientId) return `/clients/${this.$route.params.client_id}/users/`
                else return `/partners/${this.$route.params.partner_id}/users/`
            },
        },
        created: function() {
            this.users = this.$store.users.users
            this.clientId = app.router.currentRoute.params.client_id
            this.partnerId = app.router.currentRoute.params.partner_id
        },
        data: function() {
            return {
                clientId: '',
                partnerId: '',
            }
        },
        methods: {
            fetchData: actions.readUsers,
        },
        render: template.r,
        staticRenderFns: template.s,
        store: {
            users: 'users.users',
        },
    }
}
