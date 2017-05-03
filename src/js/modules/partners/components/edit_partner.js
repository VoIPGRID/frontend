'use strict'

const Component = require('../../../lib/component')


class EditPartnerComponent extends Component {

    constructor(app) {
        super(app)
        this.template = app.templates.partners_edit_partner

        // Mount state from the store to the component.
        this.computed = Vuex.mapState({
            partner: state => state.partners.partner,
        })
    }


    // Mount actions from the store to the component.
    mounted() {
        this.app.vuex.dispatch('partners/readPartner', this.app.router.currentRoute.params.partner_id)
    }
}


module.exports = EditPartnerComponent
