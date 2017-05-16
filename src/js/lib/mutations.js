module.exports = function(app) {
    /**
     * Global Vuex mutations. Make sure not to intervere state
     * property names with module state names.
     * @memberof module:app
     * @namespace
     */
    let mutations = {}

    /**
     * Editing client is changed.
     * @param {Observer} state - The globally scoped state.
     * @param {Object} notification - Notification to add to store.
     */
    mutations.ADD_NOTIFICATION = (state, notification) => {
        state.notifications.push(notification)
    }

    /**
     * Remove notification from the store.
     * @param {Observer} state - The globally scoped state.
     * @param {Object} notification - Notification to remove from store.
     */
    mutations.REMOVE_NOTIFICATION = (state, notification) => {
        state.notifications = state.notifications.filter((i) => i.id !== notification.id)
    }

    return mutations
}
