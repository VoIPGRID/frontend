'use strict'

const actions = require('./actions')
const mutations = require('./mutations')


class DashboardModule {

    constructor(app) {
        this.actions = actions(app)
        this.mutations = mutations(app)

        this.state = {
            modules: [
                {name: 'VoIP-account', 'icon': 'fa-phone'},
                {name: 'Dialplan', 'icon': 'fa-phone'},
                {name: 'Conference', 'icon': 'fa-phone'},
                {name: 'Openinghours', 'icon': 'fa-phone'},
                {name: 'Messages', 'icon': 'fa-phone'},
                {name: 'Music on hold', 'icon': 'fa-phone'},
                {name: 'IVR', 'icon': 'fa-phone'},
                {name: 'Listen in', 'icon': 'fa-phone'},
                {name: 'Filter', 'icon': 'fa-phone'},
                {name: 'Call recording', 'icon': 'fa-phone'},

            ],
        }

        app.router.addRoutes([{
            path: '/',
            name: 'dashboard_home',
            component: require('./components/home')(app, this),
        }])
    }
}


module.exports = DashboardModule
