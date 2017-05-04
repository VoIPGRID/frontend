'use strict'

module.exports = function(app) {
    return {
        readPartner: (store, partnerId) => {
            app.api.get(`partners/${partnerId}/`).then((res) => {
                store.commit('PARTNER_CHANGED', res.data)
            })
        },
        readPartners: (store) => {
            app.api.get('partners/').then((res) => {
                console.log(res.data)
                store.commit('PARTNERS_CHANGED', res.data)
            })
        },
        createPartner: (store) => {
            const partner = store.state.partner
            app.api.post('partners/', partner).then((res) => {
                store.dispatch('notify', {message: `Partner ${partner.name} succesfully created`}, {root: true})
                app.router.push({name: 'list_partners'})
            })
        },
        updatePartner: (store) => {
            const partner = store.state.partner
            app.api.put(`partners/${partner.id}/`, partner).then((res) => {
                store.commit('PARTNER_CHANGED', res.data)
                store.dispatch('notify', {message: `Partner ${partner.name} succesfully updated`}, {root: true})
                app.router.push({name: 'list_partners'})
            })
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
