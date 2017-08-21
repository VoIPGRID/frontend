module.exports = (app, actions) => {
    const template = app.templates.clients_add_edit_client
    const v = Vuelidate.validators
    const $t = Vue.i18n.translate

    return {
        asyncData: async function(store, router) {
            let clientData = await actions.readClient(router.params.client_id)
            Object.assign(store.clients, clientData)
        },
        created: function() {
            this.client = this.$store.clients.client

            this.tabs = [
                {id: 'client', title: $t('Client')},
                {id: 'preferences', title: $t('Preferences')},
                {id: 'billing', title: $t('Billing Preferences')},
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
                const clientData = await actions.readClient(clientId)
                Object.assign(this.$store.clients, clientData)
            },
            upsertClient: actions.upsertClient,
        },
        render: template.r,
        staticRenderFns: template.s,
        store: {
            client: 'clients.client',
            root: 'clients',
        },
        validations: {
            client: {
                billingprofile: {
                    billing_email: {
                        email: v.email,
                    },
                    currency: {
                        required: v.required,
                    },
                },
                description: {
                    maxLength: v.maxLength(63),
                },
                foreign_code: {
                    maxLength: v.maxLength(16),
                },
                name: {
                    minLength: v.minLength(3),
                    required: v.required,
                },
                profile: {
                    audio_language: {
                        required: v.required,
                    },
                    country: {
                        code: {
                            required: v.required,
                        },
                    },
                    system_language: {
                        required: v.required,
                    },
                    timezone: {
                        required: v.required,
                    },
                },
            },
        },
    }
}
