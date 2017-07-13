module.exports = (app, actions) => {
    const template = app.templates.clients_add_edit_client
    const v = Vuelidate.validators

    return Vue.component('AddEditClient', {
        render: template.r,
        staticRenderFns: template.s,
        store: {
            root: 'clients',
            client: 'clients.client',
        },
        methods: {
            formIsValid: function() {
                return !this.$v.$invalid
            },
            upsertClient: actions.upsertClient,
        },
        mounted: function() {
            actions.readClient(this.$store.clients, app.router.currentRoute.params.client_id)
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
    })
}
