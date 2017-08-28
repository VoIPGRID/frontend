module.exports = (app, actions) => {
    const template = app.templates.users_add_edit_user
    const v = Vuelidate.validators
    const $t = Vue.i18n.translate

    function localData() {
        const route = app.router.currentRoute
        this.userId = route.params.user_id
        if (String(this.userId) === String(app.store.user.id)) {
            this.isProfile = true
        }
    }

    async function asyncData(route) {
        const clientId = route.params.client_id
        const partnerId = route.params.partner_id
        const userId = route.params.user_id

        const context = await actions.readUser(clientId, partnerId, userId)

        Object.assign(context, {
            clientId: route.params.client_id,
            partnerId: route.params.partner_id,
            userId: route.params.user_id,
        })

        if (userId === app.store.user.id) context.isProfile = true
        else context.isProfile = false

        // Called from the created hook or the watch hook.
        if (this.constructor.name === 'VueComponent') localData.call(this)
        Object.assign(app.store.users, context)
        return context
    }


    return {
        asyncData: function(route) {
            return asyncData.call(this, route)
        },
        computed: {
            fullName: function() {
                return `${this.user.profile.first_name} ${this.user.profile.last_name}`
            },
        },
        created: function() {
            this.tabs = [
                {id: 'personal', title: $t('User profile')},
                {id: 'language', title: $t('Preferences')},
                {id: 'telephony', show: () => Boolean(this.$route.params.client_id), title: $t('Telephony settings')},
                {id: 'security', title: $t('Security')},
            ]
            localData.call(this)
        },
        data: function() {
            return {
                clientId: this.$route.params.client_id,
                isProfile: false,
                partnerId: this.$route.params.partner_id,
                tabs: [],
                userId: this.$route.params.user_id,
            }
        },
        methods: {
            setLanguage: actions.setLanguage,
            upsertUser: actions.upsertUser,
        },
        render: template.r,
        staticRenderFns: template.s,
        store: {
            apiValidation: 'main.apiValidation',
            groups: 'users.groups',
            root: 'users',
            user: 'users.user',
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
            $route: function(to, from) {
                asyncData.call(this, to)
            },
        },
    }
}
