module.exports = function(app) {
    /**
     * @memberof module:partners
     * @namespace
     */
    let mutations = {}

    /**
     * Editing partner is changed.
     * @param {Observer} state - The partner module scoped state.
     * @param {Object} partner - The new partner state.
     */
    mutations.PARTNER_CHANGED = (state, partner) => {
        state.partner = partner
    }

    /**
     * Editing partner is emptied.
     * @param {Observer} state - The partner module scoped state.
     * @param {Object} partner - The new emptied partner state.
     */
    mutations.PARTNER_EMPTIED = (state) => {
        state.partner = {
            name: '',
            description: '',
        }
    }

    /**
     * Remove partner from the partners list.
     * @param {Observer} state - The partner module scoped state.
     * @param {Object} partner - The new partners state without partner.
     */
    mutations.PARTNER_DELETED = (state, partner) => {
        state.partners = state.partners.filter((i) => i.id !== partner.id)
    }

    /**
     * Change the current partners list.
     * @param {Observer} state - The partner module scoped state.
     * @param {Object} partners - The partner object to set state to.
     */
    mutations.PARTNERS_CHANGED = (state, partners) => {
        state.partners = partners
    }

    return mutations

}
