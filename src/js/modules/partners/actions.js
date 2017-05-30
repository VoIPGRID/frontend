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
     * Read partner from the API and commit the change to the store.
     * @param {Vuex} store - The Vuex store.
     * @param {String} partnerId - ID of the partner to read from the API.
     */
    actions.readPartner = async (store, partnerId) => {
        if (partnerId) {
            let [owners, partner] = await Promise.all([
                app.api.get(`partners/${partnerId}/owners`),
                app.api.get(`partners/${partnerId}/`),
            ])

            partner.data.owners = owners.data.results
            store.commit('PARTNER_CHANGED', partner.data)
        } else {
            // Clear the currently selected partner and use the partner id
            // of the user to determine which owners may be used.

            let {data: {results}} = await app.api.get(`partners/${__state.partner}/owners`)
            store.commit('PARTNER_EMPTIED', {owners: results})
        }

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
        // Format the data that we are about to send to the API first.
        const partner = JSON.parse(JSON.stringify(store.state.partner))
        delete partner.owners

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
