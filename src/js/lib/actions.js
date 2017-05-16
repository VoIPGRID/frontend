module.exports = function(app) {
    let idCounter = 0

    /**
     * Global Vuex actions.
     * @memberof module:app
     * @namespace
     */
    let actions = {}

    /**
     * Notify action that adds a notification to the store. The notification
     * component picks up the change and renders the notification.
     * @param {Vuex} store - The globally scoped Vuex store.
     * @param {Object} notification - Notification object to send to the store.
     * @param {String<object>} notification.title - Optional title.
     * @param {String<object>} notification.text - Main text.
     * @param {String<object>} notification.type - Bulma notification types.
     * @param {String<object>} notification.timeout - Time before removing it.
     */
    actions.notify = (store, notification = {title: '', text: '', type: 'success', timeout: 3000}) => {
        if (!notification.timeout) notification.timeout = 3000
        notification.id = idCounter
        idCounter += 1
        store.commit('ADD_NOTIFICATION', notification)
        if (typeof notification.timeout === 'number' && notification.timeout > 0) {
            setTimeout(function() {
                store.commit('REMOVE_NOTIFICATION', notification)
            }, notification.timeout)
        }
    }

    return actions
}
