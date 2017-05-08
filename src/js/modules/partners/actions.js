module.exports = function(app) {
    return {
        emptyPartner: (store) => {
            store.commit('PARTNER_EMPTIED')
        },
        readPartner: (store, partnerId) => {
            app.api.get(`partners/${partnerId}/`).then((res) => {
                store.commit('PARTNER_CHANGED', res.data)
            })
        },
        readPartners: (store, data) => {
            return new Promise((resolve, reject) => {
                const uri = `${data.resource_url}?${app.utils.toQueryString(data.params)}`
                app.api.get(uri).then((res) => {
                    store.commit('PARTNERS_CHANGED', res.data)
                    resolve(res.data)
                })
            })
        },
        upsertPartner: (store) => {
            const partner = store.state.partner
            if (partner.id) {
                app.api.put(`partners/${partner.id}/`, partner).then((res) => {
                    store.dispatch('notify', {message: `Partner ${partner.name} succesfully updated`}, {root: true})
                    app.router.push({name: 'list_partners'})
                })
            } else {
                app.api.post('partners/', partner).then((res) => {
                    store.dispatch('notify', {message: `Partner ${partner.name} succesfully created`}, {root: true})
                    app.router.push({name: 'list_partners'})
                })
            }
        },
        deletePartner: (store) => {
            const partner = store.state.partner
            app.api.delete(`partners/${partner.id}/`).then((res) => {
                store.commit('PARTNER_DELETED', partner)
                store.dispatch('notify', {message: `Partner ${partner.name} succesfully deleted`}, {root: true})
                app.router.push({name: 'list_partners'})
            })
        },
    }
}
