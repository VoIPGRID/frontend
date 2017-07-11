module.exports = (app) => {
    const template = app.templates.user_profile
    const v = Vuelidate.validators

    return Vue.component('UserProfile', {
        computed: Object.assign(Vuex.mapState({
            apiValidation: state => state.main.apiValidation,
            user: state => state.user.user,
        }), {
            formIsValid: function() {
                return !this.$v.$invalid
            },
        }),
        mounted: function() {
            app.vuex.dispatch('user/readProfile')
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
