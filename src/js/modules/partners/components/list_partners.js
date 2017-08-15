module.exports = (app, actions) => {
    const template = app.templates.partners_list_partners
    return Vue.component('ListPartners', {
        asyncData: async function(store, route) {
            // return the Promise from the action
            let partnersData = await actions.readPartners({
                params: {
                    page: 1,
                },
                resourceUrl: '/partners/',
            })
            store.partners.partners = partnersData.results
        },
        created: function() {
            this.partners = this.$store.partners.partners
        },
        methods: {
            fetchData: actions.readPartners,
            /**
             * Set the context for the currently selected partner.
             * @param {Observable} partner - The partner object.
             */
            selectPartnerContext: function(partner) {
                this.$store.users.user.selectedClient = null
                this.$store.users.user.selectedPartner = partner
            },
        },
        render: template.r,
        staticRenderFns: template.s,
        store: {
            partners: 'partners.partners',
        },
    })
}
