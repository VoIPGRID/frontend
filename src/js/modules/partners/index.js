/**
 * This module handles partner management.
 */
class PartnerModule {

    constructor(app) {
        this.actions = require('./actions')(app)
        this.mutations = require('./mutations')(app)
        this.state = {
            partners: [],
            partner: {},
        }

        app.router.addRoutes([{
            path: '/partners',
            name: 'list_partners',
            component: require('./components/list_partners')(app),
            children: [
                {
                    path: ':partner_id/delete',
                    name: 'delete_partner',
                    component: require('./components/delete_partner')(app),
                },
            ],
        }])

        const AddEditPartnerComponent = require('./components/add-edit_partner')(app)

        app.router.addRoutes([{
            path: '/partners/add',
            name: 'add_partner',
            component: AddEditPartnerComponent,
        }])

        app.router.addRoutes([{
            path: '/partners/:partner_id/edit',
            name: 'edit_partner',
            component: AddEditPartnerComponent,
        }])
    }
}

module.exports = PartnerModule
