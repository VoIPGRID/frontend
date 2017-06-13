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
     * Remove partner from the partners list.
     * @param {Observer} state - The partner module scoped state.
     * @param {Object} partner - The new partners state without partner.
     */
    mutations.PARTNER_DELETED = (state, partner) => {
        state.partners.results = state.partners.results.filter((i) => i.id !== partner.id)
    }


    /**
     * Editing partner is changed.
     * @param {Observer} state - The partner module scoped state.
     * @param {Object} options - The form's context options.
     */
    mutations.PARTNER_OPTIONS_CHANGED = (state, options) => {
        state.audioLanguages = options.audioLanguages
        state.countries = options.countries
        state.currencies = options.currencies
        state.owners = options.owners
        state.systemLanguages = options.systemLanguages
        state.timezones = options.timezones
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
