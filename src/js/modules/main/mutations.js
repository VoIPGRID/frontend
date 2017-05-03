'use strict'

module.exports = function(app) {
    return {
        AUTHENTICATE(state, authenticated) {
            if (authenticated) {
                state.authenticated = true
            } else {
                state.authenticated = false
            }
        },
        ADD_NOTIFICATION(state, notification) {
            state.notifications.push(notification)
        },
        REMOVE_NOTIFICATION(state, notification) {
            state.notifications.$remove(notification)
        },
    }
}
