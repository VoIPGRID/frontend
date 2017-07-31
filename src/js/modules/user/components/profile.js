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
                },
            }
            // The `apiValidation` is a reactive property that extends the
            // validation object based on API requested validation.
            if (this.apiValidation) {
                Object.assign(validations.user, app.api.mapValidation(this.apiValidation))
            }

            return validations
        },
    })
}
