'use strict'


module.exports = (app) => {
    const template = app.templates.partners_add_edit_partner
    return Vue.component('AddEditPartner', {
        render: template.render,
        staticRenderFns: template.staticRenderFns,
        computed: Object.assign(Vuex.mapState({
            partner: state => state.partners.partner,
        }), {
            formIsValid: function() {
                return Object.keys(this.fields).every(field => this.fields[field].valid)
            },
        }),
        mounted: function() {
            // Start of without validation errors.
            this.errors.clear()
            if (app.router.currentRoute.params.partner_id) {
                app.vuex.dispatch('partners/readPartner', app.router.currentRoute.params.partner_id)
            } else {
                app.vuex.dispatch('partners/emptyPartner')
            }
        },
    })
}
