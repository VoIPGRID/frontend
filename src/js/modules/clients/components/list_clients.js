module.exports = (app, actions) => {
    const template = app.templates.clients_list_clients
    return Vue.component('ListClients', {
        methods: {
            readClients: actions.readClients,
        },
        render: template.r,
        staticRenderFns: template.s,
        store: {
            clients: 'clients.clients',
        },
    })
}
