'use strict'

const Component = require('../../../lib/component')


class AddClientComponent extends Component {

    constructor(app) {
        super(app)
        this.template = app.templates.clients_add_client

        // Mount state from the store to the component.
        this.computed = Vuex.mapState({
            client: state => state.clients.client,
        })

        this.computed.formIsValid = function() {
            return Object.keys(this.fields).every(field => this.fields[field].valid)
        }
    }
}


module.exports = AddClientComponent
