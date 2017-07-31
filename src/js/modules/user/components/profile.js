module.exports = (app, actions) => {
    const template = app.templates.user_profile
    const v = Vuelidate.validators

    return Vue.component('UserProfile', {
        store: {
            apiValidation: 'main.apiValidation',
            user: 'user.user',
        },
        computed: {
            formIsValid: function() {
                return !this.$v.$invalid
            },
        },
        methods: {
             /*
             * Wrapper function for the select event that changes language.
             */
            setLanguage(e) {
                let oldLanguage = this.user.profile.language
                if (oldLanguage === 'en') actions.setLanguage('nl')
                else actions.setLanguage('en')
            },
            updateProfile: actions.updateProfile,
        },
        mounted: function() {
            actions.readProfile(this.$store.user)
        },
        render: template.r,
        staticRenderFns: template.s,
        validations: function() {
            let validations = {
                user: {
                    profile: {
                        first_name: {
                            maxLength: v.maxLength(30),
                        },
                        last_name: {
                            maxLength: v.maxLength(30),
                        },
                    },
                    old_password: {
                        minLength: v.minLength(6),
                    },
                    password: {
                        minLength: v.minLength(6),
                        // New password is required when old password
                        // is filled.
                        requiredIf: v.requiredIf((data) => {
                            const _required = Boolean(data.old_password && (data.old_password.length > 0))
                            return _required
                        }),
                    },
                    password_confirm: {
                        minLength: v.minLength(6),
                        requiredIf: v.requiredIf((data) => {
                            const _required = Boolean(data.old_password && (data.old_password.length > 0))
                            return _required
                        }),
                        sameAs: v.sameAs('password'),
                    },
                },
            }

            if (this.apiValidation) {
                Object.assign(validations.user, app.api.mapValidation(this.apiValidation))
            }

            return validations
        },
    })
}
