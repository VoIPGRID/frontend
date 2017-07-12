module.exports = (app) => {
    const template = app.templates.partners_list_partners
    return Vue.component('ListPartners', {
        render: template.r,
        staticRenderFns: template.s,
        methods: {
            /**
             * Set the context for the currently selected partner.
             */
            selectPartnerContext: function(e, pk) {
                app.vuex.dispatch('user/setPartnerContext', pk)
            },
        },
        computed: Vuex.mapState({
            partners: state => state.partners.partners,
            current_partner: state => state.partners.current_partner,
        }),
    })
}
