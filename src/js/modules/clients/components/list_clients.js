'use strict'

const Component = require('../../../lib/component')


class ListClientsComponent extends Component {

    constructor(app) {
        super(app)
        this.template = app.templates.clients_list_clients

        // Mount state from the store to the component.
        this.computed = Vuex.mapState({
            clients: state => state.clients.clients,
            current_client: state => state.clients.current_client,
        })

        this.notifications = {
            showLoginError: {
                title: 'Login Failed',
                message: 'Failed to authenticate',
                type: 'error',
            },
        }
    }


    mounted() {
        this.app.vuex.dispatch('clients/readClients')
    }
}


module.exports = ListClientsComponent
