module.exports = function(app) {
    /**
     * @memberof module:partners
     * @namespace
     */
    let actions = {}

    /**
     * Delete a partner to the API, commit the deleted partner to the partners
     * property of the store and commit a notification. Route to the last route
     * afterwards.
     * @param {Vuex} store - The Vuex store.
     */
    actions.deletePartner = (store) => {
        const partner = store.state.partner
        app.api.delete(`partners/${partner.id}/`).then((res) => {
            let $t = Vue.i18n.translate
            store.commit('PARTNER_DELETED', partner)
            store.dispatch('notify', {
                message: $t('Partner {name} succesfully deleted', {name: partner.name}),
            }, {root: true})
            app.router.push({name: 'list_partners'})
        })
    }

    /**
     * Clear the currently selected partner.
     * @param {Vuex} store - The Vuex store.
     */
    actions.emptyPartner = (store) => {
        store.commit('PARTNER_EMPTIED')
    }

    /**
     * Read partner from the API and commit the change to the store.
     * @param {Vuex} store - The Vuex store.
     * @param {String} partnerId - ID of the partner to read from the API.
     */
    actions.readPartner = (store, partnerId) => {
        app.api.get(`partners/${partnerId}/`).then((res) => {
            store.commit('PARTNER_CHANGED', res.data)
        })
    }

    /**
     * Read partners from the API and commit the change to the store.
     * Used by the paginator component.
     * @param {Vuex} store - The Vuex store.
     * @param {Object} data - Context passed from the Paginator component.
     * @returns {Promise} - Resolves when API data is committed to the store.
     */
    actions.readPartners = (store, data) => {
        return new Promise((resolve, reject) => {
            const uri = `${data.resource_url}?${app.utils.stringifySearch(data.params)}`
            app.api.get(uri).then((res) => {
                store.commit('PARTNERS_CHANGED', res.data)
                resolve(res.data)
            })
        })
    }

    /**
     * Update or insert a partner to the API, commit a notification to the store
     * and route back to the last route afterwards.
     * @param {Vuex} store - The Vuex store.
     */
    actions.upsertPartner = (store) => {
        const partner = store.state.partner
        let $t = Vue.i18n.translate
        if (partner.id) {
            app.api.put(`partners/${partner.id}/`, partner).then((res) => {
                store.dispatch('notify', {
                    message: $t('Partner {name} succesfully updated', {name: partner.name}),
                }, {root: true})
                app.router.push(app.utils.lastRoute('list_partners'))
            })
        } else {
            app.api.post('partners/', partner).then((res) => {
                store.dispatch('notify', {
                    message: $t('Partner {name} succesfully created', {name: partner.name}),
                }, {root: true})
                app.router.push(app.utils.lastRoute('list_partners'))
            })
        }
    }

    return actions
}
