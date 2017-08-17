module.exports = (app, actions) => {
    const template = app.templates.main_navigation

    return {
        methods: {
            deselectClient() {
                this.user.selectedClient = null
                app._store.setCookieState({
                    selectedClient: null,
                })
            },
            deselectPartner() {
                this.user.selectedClient = null
                this.user.selectedPartner = null
                app._store.setCookieState({
                    selectedClient: null,
                    selectedPartner: null,
                })
            },
        },
        render: template.r,
        staticRenderFns: template.s,
        store: {
            user: 'user',
        },
    }
}
