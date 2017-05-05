'use strict'


class DashboardModule {

    constructor(app) {
        this.actions = require('./actions')(app)
        this.mutations = require('./mutations')(app)
        this.state = {
            modules: [
                {name: 'VoIP-account', 'icon': 'vg-icon-phoneaccount'},
                {name: 'Phone number', 'icon': 'vg-icon-phone-dial-buttons', disabled: true},
                {name: 'Users', 'icon': 'vg-icon-user', disabled: true},
                {name: 'Callgroup', 'icon': 'vg-icon-callgroup', disabled: true},
                {name: 'Fixed/Mobile', 'icon': 'vg-icon-fixeddestination', disabled: true},
                {name: 'Voicemail', 'icon': 'vg-icon-voicemail', disabled: true},

                {name: 'Openinghours', 'icon': 'vg-icon-openinghours', disabled: true},
                {name: 'Messages', 'icon': 'vg-icon-recording', disabled: true},
                {name: 'Music on hold', 'icon': 'vg-icon-musiconhold', disabled: true},

                {name: 'Fax inbound', 'icon': 'vg-icon-fax', disabled: true},
                {name: 'Fax outbound', 'icon': 'vg-icon-outgoing-fax', disabled: true},

                {name: 'IVR', 'icon': 'vg-icon-ivr', disabled: true},
                {name: 'Queue', 'icon': 'vg-icon-queue', disabled: true},
                {name: 'Conference', 'icon': 'vg-icon-conference', disabled: true},
                {name: 'Pickup group', 'icon': 'vg-icon-pick-up-group', disabled: true},
                {name: 'Listen in', 'icon': 'vg-icon-listen', disabled: true},
                {name: 'Filter', 'icon': 'vg-icon-filter', disabled: true},
                {name: 'Area group', 'icon': 'vg-icon-areagroup', disabled: true},
                {name: 'Area routing', 'icon': 'vg-icon-areacode', disabled: true},
                {name: 'Call recording', 'icon': 'vg-icon-call-record', disabled: true},

                {name: 'Sounds', 'icon': 'vg-icon-sounds', disabled: true},
                {name: 'VoIP trunk', 'icon': 'vg-icon-trunkaccount', disabled: true},
                {name: 'SIP analysis', 'icon': 'vg-icon-sip-analysis', disabled: true},

                {name: 'Call-me-now', 'icon': 'vg-icon-call-person', disabled: true},
                {name: 'Web hooks', 'icon': 'vg-icon-http', disabled: true},
                {name: 'Caller ID lookup', 'icon': 'vg-icon-caller-id', disabled: true},
                {name: 'CRM', 'icon': 'vg-icon-crm-popup', disabled: true},

                {name: 'Dialplan', 'icon': 'fa fa-retweet', disabled: true},
            ],
        }

        app.router.addRoutes([{
            path: '/',
            name: 'dashboard_home',
            component: require('./components/home')(app),
        }])
    }
}


module.exports = DashboardModule
