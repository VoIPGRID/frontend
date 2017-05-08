module.exports = function(app) {
    return {
        /**
         * Set the partners variable state that is used for the partner's
         * list view.
         * @param {Vuex.State} state - The partner module's state.
         * @param {Array} partners - The updated array of partners from the API.
         */
        PARTNER_CHANGED: (state, partner) => {
            state.partner = partner
        },
        PARTNER_EMPTIED: (state) => {
            state.partner = {}
        },
        /**
         * Remove the partner from the store's partners.
         */
        PARTNER_DELETED: (state, partner) => {
            state.partners = state.partners.filter((i) => i.id !== partner.id)
        },
        PARTNERS_CHANGED: (state, partners) => {
            state.partners = partners
        },
    }
}
