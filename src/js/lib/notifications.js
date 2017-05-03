'use strict'

module.exports = function install(Vue, store) {
    console.log(store)
    Vue.prototype.$notify = (options = {}) => {};
    Vue.prototype.$error = (text, options = {}) => {};
    Vue.prototype.$warn = (text, options = {}) => {};
    Vue.prototype.$success = (text, options = {}) => {};

    Vue.component('notifications', {
        components: {
        notification: {}
    },
    computed: {
        notifications: () => store.state.notifications
    },
        template: '<div><notification v-for="notification in notifications"></notification></div>'
    });
}
