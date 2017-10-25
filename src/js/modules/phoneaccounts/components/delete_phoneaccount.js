module.exports = (app, actions) => {
    const template = app.templates.phoneaccounts_delete_phoneaccount

    async function asyncData(route) {
        let phoneaccountData = await actions.readPhoneaccount(route.params.client_id, route.params.phoneaccount_id)
        Object.assign(app.store.phoneaccounts, phoneaccountData)
        return phoneaccountData
    }

    return {
        asyncData: function(route) {
            return asyncData.call(this, route)
        },
        methods: {
            deletePhoneaccount: actions.deletePhoneaccount,
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
