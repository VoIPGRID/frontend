module.exports = (app, actions) => {
    const template = app.templates.phoneaccounts_delete_phoneaccount

    async function asyncData(route) {
        const clientId = route.params.client_id
        let phoneaccountData = await actions.readPhoneaccount(clientId, false)
        Object.assign(app.store.phoneaccounts, phoneaccountData)
        return phoneaccountData
    }

    return {
        asyncData: function(route) {
            return asyncData.call(this, route)
        },
        methods: {
            deleteClient: actions.deleteClient,
        },
        render: template.r,
        staticRenderFns: template.s,
        store: {
            phoneaccount: 'phoneaccounts.phoneaccount',
        },
        watch: {
            $route: function(to, from) {
                asyncData.call(this, to)
            },
        },
    }
}
