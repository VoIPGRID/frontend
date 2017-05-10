/**
 * A simple notification component that uses the Vuex
 * store to maintain state.
 * @param {Vue} Vue - The Vue object.
 * @param {Vuex} store - The Vuex store instance.
 */
module.exports = function install(Vue, store) {
    const templateNotification = templates.components_notification
    const templateNotifications = templates.components_notifications

    Vue.component('notification', {
        render: templateNotification.r,
        staticRenderFns: templateNotification.s,
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
        render: templateNotifications.r,
        staticRenderFns: templateNotifications.s,
    })
}
