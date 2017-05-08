module.exports = (app) => {
    const template = app.templates.partners_list_partners
    return Vue.component('ListPartners', {
        render: template.render,
        staticRenderFns: template.staticRenderFns,
        computed: Vuex.mapState({
            partners: state => state.partners.partners,
            current_partner: state => state.partners.current_partner,
        }),
    })
}
