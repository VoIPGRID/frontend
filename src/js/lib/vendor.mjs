// Use es module imports for npm libraries that support it here.
// import Vue from 'vue/dist/vue.runtime.esm'

import {Tab, Tabs} from 'fuet-tabs'
import {Pagination} from 'fuet-pagination'
import {Notification, Notifications, FuetNotify} from 'fuet-notify'

Vue.use(FuetNotify)

Vue.component('Pagination', Pagination)
Vue.component('Notification', Notification)
Vue.component('Notifications', Notifications)
Vue.component('Tab', Tab)
Vue.component('Tabs', Tabs)

Object.assign(global, {Vue})

export const vendor = {
    FuetNotify,
    Notification,
    Notifications,
    Pagination,
    Tab,
    Tabs,
}
