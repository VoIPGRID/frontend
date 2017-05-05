'use strict'


module.exports = (app) => {
    const template = app.templates.partners_edit_partner
    return Vue.component('EditPartner', {
        render: template.render,
        staticRenderFns: template.staticRenderFns,
        computed: Vuex.mapState({
            partner: state => state.partners.partner,
        }),
        mounted: function() {
            app.vuex.dispatch('partners/readPartner', app.router.currentRoute.params.partner_id)
        },
    })
}
