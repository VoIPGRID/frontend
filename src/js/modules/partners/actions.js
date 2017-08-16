module.exports = function(app, _module) {
    /**
    * @memberof module:partners
    * @namespace
    */
    let actions = {}


    /**
    * Delete a partner to the API, update the store and add a notification.
    * Route to the last route afterwards.
    * @param {Observable} partner - The partner store object.
    */
    actions.deletePartner = function(partner) {
        app.api.client.delete(`partners/${partner.id}/`).then((res) => {
            let $t = Vue.i18n.translate
            this.$store.partners.partners = this.$store.partners.partners.filter((i) => i.id !== partner.id)
            app.vue.$shout({message: $t('Partner {name} succesfully deleted', {name: partner.name})})
            app.router.push({name: 'list_partners'})
        })
    }


    /**
    * Read partner from the API and update the partner store object.
    * @param {String} partnerId - ID of the partner to read from the API.
    * @returns {Object} - All data related to the partner form.
    */
    actions.readPartner = async function(partnerId) {
        let partner
        if (partnerId) {
            const res = await app.api.client.get(`partners/${partnerId}/`)
            partner = res.data
        } else {
            partner = _module.getObservables().partner
        }

        let [audio, countries, currencies, owners, priceplanDiscounts, system, timezones] = await Promise.all([
            app.api.client.get('partners/audio_languages/'),
            app.api.client.get('partners/countries/'),
            app.api.client.get('partners/currencies/'),
            app.api.client.get('partners/owners/'),
            app.api.client.get('partners/priceplan_discounts/'),
            app.api.client.get('partners/system_languages/'),
            app.api.client.get('partners/timezones/'),
        ])

        return {
            audioLanguages: audio.data,
            countries: countries.data,
            currencies: currencies.data,
            owners: owners.data.results,
            partner: partner,
            priceplanDiscounts: priceplanDiscounts.data,
            systemLanguages: system.data,
            timezones: timezones.data,
        }
    }


    /**
    * Read partners from the API. Used by the paginator component.
    * @param {Object} data - Context passed from the Paginator component.
    * @returns {Object} - Returns the partner object from the API endpoint.
    */
    actions.readPartners = async function(data) {
        const uri = `${data.resourceUrl}?${app.utils.stringifySearch(data.params)}`
        let partners = await app.api.client.get(uri)
        this.partners = partners.data.results
        return partners.data
    }


    /**
    * Delete a partner to the API, update the store and add a notification.
    * Route to the last route afterwards.
    * @param {Observable} partner - The partner object.
    */
    actions.upsertPartner = function(partner) {
        // Format the data that we are about to send to the API first.
        let $t = Vue.i18n.translate
        let payload = JSON.parse(JSON.stringify(partner))
        payload.owner = parseInt(partner.owner)
        if (partner.id) {
            app.api.client.put(`partners/${partner.id}/`, payload).then((res) => {
                app.vue.$shout({message: $t('Partner {name} succesfully updated', {name: partner.name})})
                app.router.push(app.utils.lastRoute('list_partners'))
            })
        } else {
            app.api.client.post('partners/', payload).then((res) => {
                app.vue.$shout({message: $t('Partner {name} succesfully created', {name: partner.name})})
                app.router.push(app.utils.lastRoute('list_partners'))
            })
        }
    }

    return actions
}
