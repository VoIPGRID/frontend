module.exports = (app, actions) => {
    const template = app.templates.users_add_edit_user
    const v = Vuelidate.validators

    return {
        methods: {
            upsertClient: actions.upsertUser,
        },
        mounted: function() {
            actions.readUser(this.$store.users.user, app.router.currentRoute.params.client_id)
        },
        render: template.r,
        staticRenderFns: template.s,
        store: {
            root: 'clients',
            client: 'clients.client',
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
