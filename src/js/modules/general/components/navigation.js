module.exports = (app, actions) => {
    const template = app.templates.general_navigation

    return {
        methods: {
            deselectClient() {
                this.user.selectedClient = {id: null, name: ''}
            },
            deselectPartner() {
                this.user.selectedClient = {id: null, name: ''}
                this.user.selectedPartner = {id: null, name: ''}
            },
            logout: app.modules.users.actions.logout,
        },
        render: template.r,
        staticRenderFns: template.s,
        store: {
            user: 'user',
        },
        watch: {
            '$route'(to, from) {
                if (to.name === 'edit_client') {
                    this.user.selectedClient = {
                        id: app.store.clients.client.id,
                        name: app.store.clients.client.name,
                    }
                } else if (to.name === 'edit_partner') {
                    this.user.selectedClient = {id: null, name: null}
                    this.user.selectedPartner = {
                        id: app.store.partners.partner.id,
                        name: app.store.partners.partner.name,
                    }
                }
            },
        },
    }
}
