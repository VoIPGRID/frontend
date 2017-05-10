module.exports = (app) => {
    const template = app.templates.partners_delete_partner
    return Vue.component('DeletePartner', {
        render: template.r,
        staticRenderFns: template.s,
        computed: Vuex.mapState({
            partner: state => state.partners.partner,
        }),
        mounted: function() {
            app.vuex.dispatch('partners/readPartner', app.router.currentRoute.params.partner_id)
        },
    })
}
