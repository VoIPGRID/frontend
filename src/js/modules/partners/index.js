'use strict'

const actions = require('./actions')
const mutations = require('./mutations')

const AddPartnerComponent = require('./components/add_partner')
const DeletePartnerComponent = require('./components/delete_partner')
const EditPartnerComponent = require('./components/edit_partner')
const ListPartnersComponent = require('./components/list_partners')


/**
 * This module handles partner moderation.
 */
class PartnerModule {

    constructor(app) {
        this.actions = actions(app)
        this.mutations = mutations(app)

        const addPartnerComponent = new AddPartnerComponent(app)
        const deletePartnerComponent = new DeletePartnerComponent(app)
        const editPartnerComponent = new EditPartnerComponent(app)
        const listPartnersComponent = new ListPartnersComponent(app)

        this.state = {
            partners: [],
            partner: {},
        }

        app.router.addRoutes([{
            path: '/partners',
            name: 'list_partners',
            component: listPartnersComponent.component,
            children: [
                {
                    path: ':partner_id/delete',
                    name: 'delete_partner',
                    component: deletePartnerComponent.component,
                },
            ],
        }])

        app.router.addRoutes([{
            path: '/partners/add',
            name: 'add_partner',
            component: addPartnerComponent.component,
        }])

        app.router.addRoutes([{
            path: '/partners/:partner_id/edit',
            name: 'edit_partner',
            component: editPartnerComponent.component,
        }])
    }
}

module.exports = PartnerModule
