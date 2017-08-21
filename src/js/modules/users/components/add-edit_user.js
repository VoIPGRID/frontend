module.exports = (app, actions) => {
    const template = app.templates.users_add_edit_user
    const v = Vuelidate.validators
    const $t = Vue.i18n.translate

    return {
        asyncData: async function(store, route) {
            const clientId = route.params.client_id
            const partnerId = route.params.partner_id
            const userId = route.params.user_id

            const userData = await actions.readUser(clientId, partnerId, userId)
            Object.assign(store.users, userData)
            return userData
        },
        computed: {
            clientOrPartner: function() {
                if (this.clientId) return 'client'
                return 'partner'
            },
        },
        created: function() {
            const route = app.router.currentRoute
            this.userId = route.params.user_id
            if (this.userId === String(app.store.user.id)) {
                this.isProfile = true
            }

            this.tabs = [
                {id: 'personal', title: $t('Personal information')},
                {id: 'language', title: $t('Language settings')},
                {id: 'telephony', show: () => Boolean(this.$route.params.client_id), title: $t('Telephony settings')},
                {id: 'security', title: $t('Security')},
            ]
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
            /**
            * Wrapper function for the select event that changes language.
            */
            fetchData: async function() {
                const route = app.router.currentRoute

                const clientId = route.params.client_id
                const partnerId = route.params.partner_id
                const userId = route.params.user_id

                let context = await actions.readUser(clientId, partnerId, userId)
                if (userId === app.store.user.id) {
                    context.isProfile = true
                } else {
                    context.isProfile = false
                }
                Object.assign(context, {
                    clientId: route.params.client_id,
                    partnerId: route.params.partner_id,
                    userId: route.params.user_id,
                })

                Object.assign(this, context)
            },
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
    }
}
