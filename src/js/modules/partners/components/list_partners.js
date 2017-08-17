module.exports = (app, actions) => {
    const template = app.templates.partners_list_partners
    return Vue.component('ListPartners', {
        asyncData: async function(store, route) {
            // return the Promise from the action
            let currentPage = parseInt(route.query.page) || 1
            let partnersData = await actions.readPartners({page: currentPage})
            store.partners.partners = partnersData
            return partnersData
        },
        created: function() {
            this.partners = this.$store.partners.partners
        },
        methods: {
            fetchData: actions.readPartners,
            /**
            * Set the context for the currently selected partner and stores
            * it in a cookie to persist after page reload.
            * @param {Observable} partner - The partner object.
            */
            selectPartnerContext: function(partner) {
                this.$store.user.selectedClient = null
                this.$store.user.selectedPartner = partner
                app._store.setCookieState({
                    selectedClient: null,
                    selectedPartner: {
                        id: partner.id,
                        name: partner.name,
                    },
                })
            },
        },
        render: template.r,
        staticRenderFns: template.s,
        store: {
            partners: 'partners.partners',
        },
    })
}
