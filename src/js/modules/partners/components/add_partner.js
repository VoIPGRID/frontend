'use strict'


module.exports = (app) => {
    const template = app.templates.partners_add_partner
    return Vue.component('AddPartner', {
        render: template.render,
        staticRenderFns: template.staticRenderFns,
        computed: Object.assign(Vuex.mapState({
            partner: state => state.partners.partner,
        }), {
            formIsValid: function() {
                return Object.keys(this.fields).every(field => this.fields[field].valid)
            },
        }),
    })
}
