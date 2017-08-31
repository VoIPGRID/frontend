module.exports = (app, actions) => {
    const template = app.templates.phoneaccounts_list_phoneaccounts
    return {
        asyncData: async function(route) {
            // return the Promise from the action
            let currentPage = parseInt(route.query.page) || 1
            const clientId = route.params.client_id
            let phoneaccountsData = await actions.readPhoneaccounts(clientId, currentPage)
            app.store.phoneaccounts.phoneaccounts = phoneaccountsData
            return phoneaccountsData
        },
        created: function() {
            this.phoneaccounts = this.$store.phoneaccounts.phoneaccounts
        },
        methods: {
            fetchData: actions.readPhoneaccounts,
        },
        render: template.r,
        staticRenderFns: template.s,
        store: {
            phoneaccounts: 'phoneaccounts.phoneaccounts',
        },
    }
}
