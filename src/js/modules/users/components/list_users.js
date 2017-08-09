module.exports = (app, actions) => {
    const template = app.templates.users_list_users
    return {
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
            this.clientId = app.router.currentRoute.params.client_id
            this.partnerId = app.router.currentRoute.params.partner_id
        },
        data: function() {
            return {
                clientId: null,
                partnerId: null,
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
