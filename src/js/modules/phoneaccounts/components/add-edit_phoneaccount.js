module.exports = (app, actions) => {
    const template = app.templates.phoneaccounts_add_edit_phoneaccount
    const v = Vuelidate.validators
    const $t = Vue.i18n.translate

    return {
        asyncData: async function(router) {
            const clientId = router.params.client_id
            let phoneaccountData = await actions.readPhoneaccount(clientId, router.params.phoneaccount_id)
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
                const phoneaccountId = app.router.currentRoute.params.phoneaccount_id
                const phoneaccountData = await actions.readPhoneaccount(clientId, phoneaccountId)
                Object.assign(this.$store.phoneaccounts, phoneaccountData)
            },
            upsertPhoneaccount: actions.upsertPhoneaccount,
        },
        render: template.r,
        staticRenderFns: template.s,
        store: {
            phoneaccount: 'phoneaccounts.phoneaccount',
            root: 'phoneaccounts',
        },
        validations: function() {
            let validations = {
                phoneaccount: {
                    account_id: {
                        required: v.required,
                    },
                    callerid_number: {
                        required: v.required,
                    },
                    country: {
                        code: {
                            required: v.required,
                        },
                    },
                    description: {
                        maxLength: v.maxLength(63),
                        required: v.required,
                    },
                },
            }

            if (this.phoneaccount.country.code === 'nl') {
                validations.phoneaccount.n112_region = {id: {required: v.required}}
            }

            return validations
        },
        watch: {
            $route: 'fetchData',
        },
    }
}
