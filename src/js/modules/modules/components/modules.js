module.exports = (app) => {
    const $t = Vue.i18n.translate
    const template = app.templates.modules_modules

    return Vue.component('DashboardHome', {
        created: function() {
            app.store.breadcrumbs = ['Dashboard']
        },
        data: function() {
            return {
                modules: [
                    {disabled: true, icon: 'vg-icon-phoneaccount', name: $t('VoIP account')},
                    {disabled: true, icon: 'vg-icon-phone-dial-buttons', name: $t('Phone number')},
                    {disabled: true, icon: 'vg-icon-user', name: $t('Users')},
                    {disabled: true, icon: 'vg-icon-callgroup', name: $t('Callgroup')},
                    {disabled: true, icon: 'vg-icon-fixeddestination', name: $t('Fixed/Mobile')},
                    {disabled: true, icon: 'vg-icon-voicemail', name: $t('Voicemail')},

                    {disabled: true, icon: 'vg-icon-openinghours', name: $t('Openinghours')},
                    {disabled: true, icon: 'vg-icon-recording', name: $t('Messages')},
                    {disabled: true, icon: 'vg-icon-musiconhold', name: $t('Music on hold')},

                    {disabled: true, icon: 'vg-icon-fax', name: $t('Fax inbound')},
                    {disabled: true, icon: 'vg-icon-outgoing-fax', name: $t('Fax outbound')},

                    {disabled: true, icon: 'vg-icon-ivr', name: $t('IVR')},
                    {disabled: true, icon: 'vg-icon-queue', name: $t('Queue')},
                    {disabled: true, icon: 'vg-icon-conference', name: $t('Conference')},
                    {disabled: true, icon: 'vg-icon-pick-up-group', name: $t('Pickup group')},
                    {disabled: true, icon: 'vg-icon-listen', name: $t('Listen in')},
                    {disabled: true, icon: 'vg-icon-filter', name: $t('Filter')},
                    {disabled: true, icon: 'vg-icon-areagroup', name: $t('Area group')},
                    {disabled: true, icon: 'vg-icon-areacode', name: $t('Area routing')},
                    {disabled: true, icon: 'vg-icon-call-record', name: $t('Call recording')},

                    {disabled: true, icon: 'vg-icon-sounds', name: $t('Sounds')},
                    {disabled: true, icon: 'vg-icon-trunkaccount', name: $t('VoIP trunk')},
                    {disabled: true, icon: 'vg-icon-sip-analysis', name: $t('SIP analysis')},

                    {disabled: true, icon: 'vg-icon-call-person', name: $t('Call-me-now')},
                    {disabled: true, icon: 'vg-icon-http', name: $t('Web hooks')},
                    {disabled: true, icon: 'vg-icon-caller-id', name: $t('Caller ID lookup')},
                    {disabled: true, icon: 'vg-icon-crm-popup', name: $t('CRM')},

                    {disabled: true, icon: 'vg-icon-ivr', name: $t('Dialplan')},
                ],
            }
        },
        render: template.r,
        staticRenderFns: template.s,
    })
}
