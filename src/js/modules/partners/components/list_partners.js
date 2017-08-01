module.exports = (app, actions) => {
    const template = app.templates.partners_list_partners
    return Vue.component('ListPartners', {
        methods: {
            readPartners: actions.readPartners,
            /**
             * Set the context for the currently selected partner.
             * @param {Observable} partner - The partner object.
             */
            selectPartnerContext: function(partner) {
                this.$store.user.selectedClient = null
                this.$store.user.selectedPartner = partner
            },
        },
        render: template.r,
        staticRenderFns: template.s,
        store: {
            partners: 'partners.partners',
        },
    })
}
