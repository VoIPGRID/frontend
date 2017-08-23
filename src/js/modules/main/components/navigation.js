module.exports = (app, actions) => {
    const template = app.templates.main_navigation

    return {
        methods: {
            deselectClient() {
                this.user.selectedClient = {id: null, name: ''}
            },
            deselectPartner() {
                this.user.selectedClient = {id: null, name: ''}
                this.user.selectedPartner = {id: null, name: ''}
            },
        },
        render: template.r,
        staticRenderFns: template.s,
        store: {
            user: 'user',
        },
    }
}
