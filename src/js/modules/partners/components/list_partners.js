module.exports = (app, actions) => {
    const template = app.templates.partners_list_partners
    return Vue.component('ListPartners', {
        methods: {
            /**
             * Set the context for the currently selected partner.
             * @param {Observable} partner - The partner object.
             */
            selectPartnerContext: function(partner) {
                this.$store.user.selectedPartner = partner
            },
            readPartners: actions.readPartners,
        },
        render: template.r,
        staticRenderFns: template.s,
        store: {
            partners: 'partners.partners',
        },
    })
}
