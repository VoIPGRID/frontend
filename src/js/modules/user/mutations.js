module.exports = function(app) {
    /**
     * @memberof module:clients
     * @namespace
     */
    let mutations = {}

    /**
     * Set the authentication switch and clear the password from the store.
     * @param {Observer} state - The user module scoped state.
     * @param {Boolean} authenticated - The new authenticated state.
     */
    mutations.AUTHENTICATE = (state, authenticated) => {
        if (authenticated) {
            state.authenticated = true
        } else {
            state.authenticated = false
        }
        // Don't keep the password in the store for security reasons.
        state.credentials.password = ''
    }

    mutations.SET_USER = (state, userState) => {
        state.superuser = userState.superuser
        if (userState.partner) state.partner = userState.partner
        else if (userState.client) state.client = userState.client
    }

    mutations.SET_PARTNER_CONTEXT = (state, selectedPartner) => {
        state.selectedPartner = selectedPartner
    }

    mutations.FILL_USER_PROFILE = (state, user) => {
        state.user = user
    }

    return mutations
}
