'use strict'

const Component = require('../../../lib/component')


class ListPartnersComponent extends Component {

    constructor(app) {
        super(app)
        this.template = app.templates.partners_list_partners

        // Mount state from the store to the component.
        this.computed = Vuex.mapState({
            partners: state => state.partners.partners,
            current_partner: state => state.partners.current_partner,
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
        this.app.vuex.dispatch('partners/readPartners')
    }
}


module.exports = ListPartnersComponent
