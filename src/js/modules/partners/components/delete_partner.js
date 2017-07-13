module.exports = (app, actions) => {
    const template = app.templates.partners_delete_partner
    return Vue.component('DeletePartner', {
        methods: {
            deletePartner: actions.deletePartner,
        },
        mounted: function() {
            actions.readPartner(this.$store.partners, app.router.currentRoute.params.partner_id)
        },
        render: template.r,
        staticRenderFns: template.s,
        store: {
            partner: 'partners.partner',
        },
    })
}
