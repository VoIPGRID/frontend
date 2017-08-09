module.exports = (app, actions) => {
    const template = app.templates.users_add_edit_user
    const v = Vuelidate.validators

    return {
        computed: {
            clientOrPartner: function() {
                if (this.clientId) return 'client'
                return 'partner'
            },
        },
        created: function() {
            this.fetchData()
        },
        data: function() {
            return {
                clientId: null,
                isProfile: null,
                partnerId: null,
                userId: null,
            }
        },
        methods: {
            /**
            * Wrapper function for the select event that changes language.
            */
            fetchData: async function() {
                let context = {
                    clientId: parseInt(app.router.currentRoute.params.client_id),
                    partnerId: parseInt(app.router.currentRoute.params.partner_id),
                    userId: parseInt(app.router.currentRoute.params.user_id),
                }

                if (context.userId === app.store.users.user.id) {
                    context.isProfile = true
                } else {
                    context.isProfile = false
                }

                context.user = await actions.readUser.call(this, context.userId)
                Object.assign(this, context)
            },
            setLanguage: actions.setLanguage,
            upsertUser: actions.upsertUser,
        },
        render: template.r,
        staticRenderFns: template.s,
        store: {
            apiValidation: 'main.apiValidation',
            root: 'users',
            user: 'users.currentUser',
        },
        validations: function() {
            let validations = {
                user: {
                    old_password: {
                        minLength: v.minLength(6),
                    },
                    password: {
                        minLength: v.minLength(6),
                    },
                    password_confirm: {
                        minLength: v.minLength(6),
                        sameAs: v.sameAs('password'),
                    },
                    profile: {
                        first_name: {
                            maxLength: v.maxLength(30),
                            required: v.required,
                        },
                        last_name: {
                            maxLength: v.maxLength(30),
                            required: v.required,
                        },
                    },
                },
            }

            if (!this.isProfile) {
                validations.user.email = {
                    email: v.email,
                    required: v.required,
                }
            }

            // Validation specific for new users.
            if (!this.userId) {
                // Password is required for new users.
                validations.user.password.required = v.required
                validations.user.password_confirm.required = v.required
            } else {
                // Validation specific for exsting users.

                // The old password is required if the new password is filled.
                validations.user.old_password.requiredIf = v.requiredIf(() => {
                    return (this.user.password && this.user.password.length > 0)
                })

                // A new password is required if the old password is filled.
                validations.user.password.requiredIf = v.requiredIf(() => {
                    return (this.user.old_password && this.user.old_password.length > 0)
                })

                // Password confirmation is required when a new password is
                // about to be filled.
                validations.user.password_confirm.requiredIf = v.requiredIf((data) => {
                    return (this.user.password && this.user.password.length > 0)
                })
            }

            // `apiValidation` is a reactive property that extends the
            // validation object based on API requested validation.
            if (this.apiValidation) {
                Object.assign(validations.user, app.api.mapValidation(this.apiValidation))
            }

            return validations
        },
        watch: {
            $route: 'fetchData',
        },
    }
}
