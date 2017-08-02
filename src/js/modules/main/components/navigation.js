module.exports = (app, actions) => {
    const template = app.templates.main_navigation

    return {
        methods: {
            deselectClient() {
                this.user.selectedClient = null
            },
            deselectPartner() {
                this.user.selectedClient = null
                this.user.selectedPartner = null
            },
        },
        render: template.r,
        staticRenderFns: template.s,
        store: {
            user: 'users.user',
        },
    }
}
