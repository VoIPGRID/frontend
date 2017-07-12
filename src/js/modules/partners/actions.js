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
        app.api.client.delete(`partners/${partner.id}/`).then((res) => {
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
    actions.readPartner = async(store, partnerId) => {
        let [audio, countries, currencies, owners, priceplanDiscounts, system, timezones] = await Promise.all([
            app.api.client.get('partners/audio_languages/'),
            app.api.client.get('partners/countries/'),
            app.api.client.get('partners/currencies/'),
            app.api.client.get('partners/owners/'),
            app.api.client.get('partners/priceplan_discounts/'),
            app.api.client.get('partners/system_languages/'),
            app.api.client.get('partners/timezones/'),
        ])
        store.commit('PARTNER_OPTIONS_CHANGED', {
            audioLanguages: audio.data,
            countries: countries.data,
            currencies: currencies.data,
            owners: owners.data.results,
            priceplanDiscounts: priceplanDiscounts.data,
            systemLanguages: system.data,
            timezones: timezones.data,
        })

        if (partnerId) {
            let partner = await app.api.client.get(`partners/${partnerId}/`)
            store.commit('PARTNER_CHANGED', partner.data)
        } else {
            // Need to commit all fields to the store, because reactivity
            // only works when Vuex is aware of all fields.
            store.commit('PARTNER_CHANGED', {
                billingprofile: {
                    auto_export: false,
                    billing_email: '',
                    currency: '',
                    exclude_from_export: false,
                    totalize_partner_cdrs: false,
                    use_twinfield: false,
                },
                brand: '',
                btn_text: '',
                description: '',
                domain: '',
                email_address: '',
                foreign_code: '',
                may_have_children: false,
                navlink: '',
                navlink_active: '',
                name: '',
                no_reply_email_address: '',
                profile: {
                    audio_language: '',
                    country: {
                        code: '',
                    },
                    system_language: '',
                    timezone: '',
                },
                registration_domain: '',
                spot: '',
                text: '',
                wiki_base_url: '',
            })
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
            app.api.client.get(uri).then((res) => {
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
        partner.owner = parseInt(partner.owner)

        let $t = Vue.i18n.translate
        if (partner.id) {
            app.api.client.put(`partners/${partner.id}/`, partner).then((res) => {
                store.dispatch('notify', {
                    message: $t('Partner {name} succesfully updated', {name: partner.name}),
                }, {root: true})
                app.router.push(app.utils.lastRoute('list_partners'))
            })
        } else {
            app.api.client.post('partners/', partner).then((res) => {
                store.dispatch('notify', {
                    message: $t('Partner {name} succesfully created', {name: partner.name}),
                }, {root: true})
                app.router.push(app.utils.lastRoute('list_partners'))
            })
        }
    }

    return actions
}
