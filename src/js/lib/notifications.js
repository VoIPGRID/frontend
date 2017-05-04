'use strict'

/**
 * A simple notification component that uses the Vuex
 * store to maintain state.
 */
module.exports = function install(Vue, store) {
    Vue.prototype.$notify = (options = {}) => {};
    Vue.prototype.$error = (text, options = {}) => {};
    Vue.prototype.$warn = (text, options = {}) => {};
    Vue.prototype.$success = (text, options = {}) => {};

    Vue.component('notification', {
        render: templates.lib_notification.render,
        staticRenderFns: templates.lib_notification.staticRenderFns,
        props: ['notification'],
        methods: {
            closeNotification(notification) {
                store.commit('REMOVE_NOTIFICATION', notification)
            },
        },
    })

    Vue.component('notifications', {
        computed: {
            notifications: () => store.state.notifications,
        },
        render: templates.lib_notifications.render,
        staticRenderFns: templates.lib_notifications.staticRenderFns,
    })
}
