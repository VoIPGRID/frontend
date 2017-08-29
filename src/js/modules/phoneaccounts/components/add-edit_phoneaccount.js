module.exports = (app, actions) => {
    const template = app.templates.phoneaccounts_add_edit_phoneaccount
    const v = Vuelidate.validators
    const $t = Vue.i18n.translate

    return {
        asyncData: async function(router) {
            let phoneaccountData = await actions.readPhoneaccount(router.params.phoneaccount_id)
            Object.assign(app.store.phoneaccounts, phoneaccountData)
        },
        created: function() {
            this.phoneaccount = this.$store.phoneaccounts.phoneaccount

            this.tabs = [
                {id: 'preferences', title: $t('Preferences')},
                {id: 'advanced', title: $t('Advanced Settings')},
            ]
        },
        data: function() {
            return {
                tabs: [],
            }
        },
        methods: {
            fetchData: async function() {
                const clientId = app.router.currentRoute.params.client_id
                const phoneaccountData = await actions.readPhoneaccount(clientId)
                Object.assign(this.$store.phoneaccounts, phoneaccountData)
            },
            upsertPhoneaccount: actions.upsertPhoneaccount,
        },
        render: template.r,
        staticRenderFns: template.s,
        store: {
            phoneaccount: 'phoneaccounts.phoneaccount',
            root: 'clients',
        },
        validations: {
            phoneaccount: {
                description: {
                    maxLength: v.maxLength(63),
                },
                // foreign_code: {
                //     maxLength: v.maxLength(16),
                // },
                // name: {
                //     minLength: v.minLength(3),
                //     required: v.required,
                // },
                // profile: {
                //     audio_language: {
                //         required: v.required,
                //     },
                //     country: {
                //         code: {
                //             required: v.required,
                //         },
                //     },
                //     system_language: {
                //         required: v.required,
                //     },
                //     timezone: {
                //         required: v.required,
                //     },
                // },
            },
        },
        watch: {
            $route: 'fetchData',
        },
    }
}
