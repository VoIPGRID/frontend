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
             /*
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
            updateUser: actions.updateUser,
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
                        // A new password is only required when the
                        // old password is filled.
                        minLength: v.minLength(6),
                        requiredIf: v.requiredIf(() => {
                            return (this.user.old_password && this.user.old_password.length > 0)
                        }),
                    },
                    password_confirm: {
                        minLength: v.minLength(6),
                        requiredIf: v.requiredIf((data) => {
                            return (this.user.old_password && this.user.old_password.length > 0)
                        }),
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

            // Password is required for new users.
            if (!this.userId) {
                validations.user.password.required = v.required
            }

            // The `apiValidation` is a reactive property that extends the
            // validation object based on API requested validation.
            if (this.apiValidation) {
                Object.assign(validations.user, app.api.mapValidation(this.apiValidation))
            }

            return validations
        },
        watch: {
          // call again the method if the route changes
          '$route': 'fetchData',
        },
    }
}
