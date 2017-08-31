module.exports = (app, actions) => {
    const template = app.templates.partners_list_partners
    return Vue.component('ListPartners', {
        asyncData: async function(route) {
            // return the Promise from the action
            let currentPage = parseInt(route.query.page) || 1
            let partnersData = await actions.readPartners({page: currentPage})
            app.store.partners.partners = partnersData
            return partnersData
        },
        created: function() {
            this.partners = this.$store.partners.partners
        },
        methods: {
            fetchData: async function(...args) {
                this.partners = await actions.readPartners(...args)
            },
            /**
            * Set the context for the currently selected partner and stores
            * it in a cookie to persist after page reload.
            * @param {Observable} partner - The partner object.
            */
            selectPartnerContext: function(partner) {
                this.$store.user.selectedClient = {id: null, name: ''}
                Object.assign(this.$store.user.selectedPartner, {
                    id: partner.id,
                    name: partner.name,
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
