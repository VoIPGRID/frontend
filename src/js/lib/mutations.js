/**
 * Global Vuex mutations. Make sure you don't intervere state
 * with module state names.
 */
module.exports = function(app) {
    return {
        ADD_NOTIFICATION(state, notification) {
            state.notifications.push(notification)
        },
        REMOVE_NOTIFICATION(state, notification) {
            state.notifications = state.notifications.filter((i) => i.id !== notification.id)
        },
    }
}
