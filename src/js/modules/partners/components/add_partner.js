'use strict'

const Component = require('../../../lib/component')


class AddPartnerComponent extends Component {

    constructor(app) {
        super(app)
        this.template = app.templates.partners_add_partner

        // Mount state from the store to the component.
        this.computed = Vuex.mapState({
            partner: state => state.partners.partner,
        })

        this.computed.formIsValid = function() {
            return Object.keys(this.fields).every(field => this.fields[field].valid)
        }
    }
}


module.exports = AddPartnerComponent
