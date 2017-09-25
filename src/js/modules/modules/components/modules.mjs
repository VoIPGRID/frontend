export function Modules(app) {
    const template = app.templates.modules_modules

    return Vue.component('DashboardHome', {
        created: function() {
            // app.store.breadcrumbs = ['Modules']
        },
        data: function() {
            return {
                modules: {
                    advanced: [
                        {disabled: true, icon: 'vg-icon-ivr', name: 'IVR'},
                        {disabled: true, icon: 'vg-icon-queue', name: 'Queue'},
                        {disabled: true, icon: 'vg-icon-conference', name: 'Conference'},
                        {disabled: true, icon: 'vg-icon-pick-up-group', name: 'Pickup group'},
                        {disabled: true, icon: 'vg-icon-listen', name: 'Listen in'},
                        {disabled: true, icon: 'vg-icon-filter', name: 'Filter'},
                        {disabled: true, icon: 'vg-icon-areagroup', name: 'Area group'},
                        {disabled: true, icon: 'vg-icon-areacode', name: 'Area routing'},
                        {disabled: true, icon: 'vg-icon-call-record', name: 'Call recording'},
                    ],
                    fax: [
                        {disabled: true, icon: 'vg-icon-fax', name: 'Fax inbound'},
                        {disabled: true, icon: 'vg-icon-outgoing-fax', name: 'Fax outbound'},
                    ],
                    forwarding: [
                        {disabled: true, icon: 'vg-icon-callgroup', name: 'Callgroup'},
                        {disabled: true, icon: 'vg-icon-fixeddestination', name: 'Fixed/Mobile'},
                        {disabled: true, icon: 'vg-icon-voicemail', name: 'Voicemail'},
                    ],
                    general: [
                        {disabled: true, icon: 'vg-icon-phone-dial-buttons', name: 'Phone numbers'},
                        {icon: 'vg-icon-phoneaccount', name: 'VoIP account', route: 'list_phoneaccounts'},
                        {disabled: true, icon: 'vg-icon-user', name: 'Users'},
                    ],
                    integrations: [
                        {disabled: true, icon: 'vg-icon-http', name: 'Web hooks'},
                        {disabled: true, icon: 'vg-icon-call-person', name: 'Call-me-now'},
                        {disabled: true, icon: 'vg-icon-ivr', name: 'Click-to-dial code'},
                        {disabled: true, icon: 'vg-icon-caller-id', name: 'Caller ID lookup'},
                        {disabled: true, icon: 'vg-icon-crm-popup', name: 'CRM'},
                    ],
                    options: [
                        {disabled: true, icon: 'vg-icon-openinghours', name: 'Openinghours'},
                        {disabled: true, icon: 'vg-icon-recording', name: 'Messages'},
                        {disabled: true, icon: 'vg-icon-musiconhold', name: 'Music on hold'},
                    ],
                    system: [
                        {disabled: true, icon: 'vg-icon-sounds', name: 'Sounds'},
                        {disabled: true, icon: 'vg-icon-trunkaccount', name: 'VoIP trunk'},
                        {disabled: true, icon: 'vg-icon-sip-analysis', name: 'SIP analysis'},
                    ],
                },
            }
        },
        render: template.r,
        staticRenderFns: template.s,
    })
}
