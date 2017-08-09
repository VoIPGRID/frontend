module.exports = (app, actions) => {
    const template = app.templates.partners_delete_partner
    return Vue.component('DeletePartner', {
        created: function() {
            this.fetchData()
        },
        methods: {
            deletePartner: actions.deletePartner,
            fetchData: async function() {
                const partnerId = app.router.currentRoute.params.partner_id
                const partnerData = await actions.readPartner.call(this, partnerId)
                Object.assign(this.$store.partners, partnerData)
            },
        },
        render: template.r,
        staticRenderFns: template.s,
        store: {
            partner: 'partners.partner',
        },
        watch: {
          '$route': 'fetchData',
        },
    })
}
