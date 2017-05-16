module.exports = (app) => {

    const template = app.templates.partners_add_edit_partner
    const validators = Vuelidate.validators
    /**
     * @memberof module:partners
     * @namespace
     */
    return Vue.component('AddEditPartner', {
        render: template.r,
        staticRenderFns: template.s,
        computed: Object.assign(Vuex.mapState({
            partner: state => state.partners.partner,
        }), {
            formIsValid: function() {
                return !this.$v.$invalid
            },
        }),
        mounted: function() {
            // Start of without validation errors.
            if (app.router.currentRoute.params.partner_id) {
                app.vuex.dispatch('partners/readPartner', app.router.currentRoute.params.partner_id)
            } else {
                app.vuex.dispatch('partners/emptyPartner')
            }
        },
        validations: {
            partner: {
                name: {
                    required: validators.required,
                    minLength: validators.minLength(3),
                },
            },
        },
    })
}
