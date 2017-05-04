'use strict'

let idCounter = 0
/**
 * Global Vuex actions.
 */
module.exports = function(app) {
    return {
        notify({commit}, notification = {title: '', text: '', type: 'success', timeout: 3000}) {
            if (!notification.timeout) notification.timeout = 3000
            notification.id = idCounter
            idCounter += 1
            commit('ADD_NOTIFICATION', notification)
            if (typeof notification.timeout === 'number' && notification.timeout > 0) {
                setTimeout(function() {
                    commit('REMOVE_NOTIFICATION', notification)
                }, notification.timeout)
            }
        },
    }
}
