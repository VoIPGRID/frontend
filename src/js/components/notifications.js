/**
 * A simple notification component that uses the Vuex
 * store to maintain state.
 */
module.exports = function install(Vue, store) {
    const templateNotification = templates.components_notification
    const templateNotifications = templates.components_notifications

    Vue.component('notification', {
        render: templateNotification.render,
        staticRenderFns: templateNotification.staticRenderFns,
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
        render: templateNotifications.render,
        staticRenderFns: templateNotifications.staticRenderFns,
    })
}
