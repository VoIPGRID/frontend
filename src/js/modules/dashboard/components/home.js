module.exports = (app) => {
    const template = app.templates.dashboard_home

    return Vue.component('DashboardHome', {
        data: function() {
            const $t = Vue.i18n.translate
            return {
                modules: [
                    {name: $t('VoIP account'), 'icon': 'vg-icon-phoneaccount', disabled: true},
                    {name: $t('Phone number'), 'icon': 'vg-icon-phone-dial-buttons', disabled: true},
                    {name: $t('Users'), 'icon': 'vg-icon-user', disabled: true},
                    {name: $t('Callgroup'), 'icon': 'vg-icon-callgroup', disabled: true},
                    {name: $t('Fixed/Mobile'), 'icon': 'vg-icon-fixeddestination', disabled: true},
                    {name: $t('Voicemail'), 'icon': 'vg-icon-voicemail', disabled: true},

                    {name: $t('Openinghours'), 'icon': 'vg-icon-openinghours', disabled: true},
                    {name: $t('Messages'), 'icon': 'vg-icon-recording', disabled: true},
                    {name: $t('Music on hold'), 'icon': 'vg-icon-musiconhold', disabled: true},

                    {name: $t('Fax inbound'), 'icon': 'vg-icon-fax', disabled: true},
                    {name: $t('Fax outbound'), 'icon': 'vg-icon-outgoing-fax', disabled: true},

                    {name: $t('IVR'), 'icon': 'vg-icon-ivr', disabled: true},
                    {name: $t('Queue'), 'icon': 'vg-icon-queue', disabled: true},
                    {name: $t('Conference'), 'icon': 'vg-icon-conference', disabled: true},
                    {name: $t('Pickup group'), 'icon': 'vg-icon-pick-up-group', disabled: true},
                    {name: $t('Listen in'), 'icon': 'vg-icon-listen', disabled: true},
                    {name: $t('Filter'), 'icon': 'vg-icon-filter', disabled: true},
                    {name: $t('Area group'), 'icon': 'vg-icon-areagroup', disabled: true},
                    {name: $t('Area routing'), 'icon': 'vg-icon-areacode', disabled: true},
                    {name: $t('Call recording'), 'icon': 'vg-icon-call-record', disabled: true},

                    {name: $t('Sounds'), 'icon': 'vg-icon-sounds', disabled: true},
                    {name: $t('VoIP trunk'), 'icon': 'vg-icon-trunkaccount', disabled: true},
                    {name: $t('SIP analysis'), 'icon': 'vg-icon-sip-analysis', disabled: true},

                    {name: $t('Call-me-now'), 'icon': 'vg-icon-call-person', disabled: true},
                    {name: $t('Web hooks'), 'icon': 'vg-icon-http', disabled: true},
                    {name: $t('Caller ID lookup'), 'icon': 'vg-icon-caller-id', disabled: true},
                    {name: $t('CRM'), 'icon': 'vg-icon-crm-popup', disabled: true},

                    {name: $t('Dialplan'), 'icon': 'vg-icon-ivr', disabled: true},
                ],
            }
        },
        render: template.r,
        staticRenderFns: template.s,
    })
}
