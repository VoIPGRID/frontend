module.exports = (app, actions) => {
    const template = app.templates.partners_delete_partner

    async function asyncData(route) {
        const partnerId = route.params.partner_id
        const partnerData = await actions.readPartner(partnerId, false)
        Object.assign(app.store.partners, partnerData)
        return partnerData
    }

    return Vue.component('DeletePartner', {
        asyncData: function(route) {
            return asyncData.call(this, route)
        },
        methods: {
            deletePartner: actions.deletePartner,
            fetchData: async function() {

            },
        },
        render: template.r,
        staticRenderFns: template.s,
        store: {
            partner: 'partners.partner',
        },
        watch: {
            $route: function(to, from) {
                asyncData.call(this, to)
            },
        },
    })
}
