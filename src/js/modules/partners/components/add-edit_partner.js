module.exports = (app) => {

    const template = app.templates.partners_add_edit_partner
    const v = Vuelidate.validators
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
                    required: v.required,
                    minLength: v.minLength(3),
                },
                foreign_code: {
                    maxLength: v.maxLength(3),
                },
            },
        },
    })
}
