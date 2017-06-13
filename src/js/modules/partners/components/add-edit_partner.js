module.exports = (app) => {
    const template = app.templates.partners_add_edit_partner
    const v = Vuelidate.validators

    let brandingCache = {}
    const brandingFields = ['text', 'brand', 'navlink', 'navlink_active', 'spot', 'btn_text']
    /**
     * @memberof module:partners
     * @namespace
     */
    return Vue.component('AddEditPartner', {
        render: template.r,
        staticRenderFns: template.s,
        methods: {
            /**
             * This would have been easier when there was a model
             * flag that indicates custom branding or not. Currently,
             * the indication to use custom branding or not is the absence
             * of color information for the branding fields.
             */
            toggleBranding: function() {
                if (this.branding) {
                    // Switch branding off by emptying all fields.
                    for (let field of brandingFields) {
                        brandingCache[field] = this.partner[field]
                        this.partner[field] = ''
                    }
                } else {
                    // Restore choices from cache.
                    if (Object.keys(brandingCache).length) {
                        for (let field of brandingFields) {
                            this.partner[field] = brandingCache[field]
                        }
                    } else {
                        // Or enable them all by setting value to black.
                        for (let field of brandingFields) {
                            this.partner[field] = '#000000'
                        }
                    }
                }
            },
        },
        computed: Object.assign(Vuex.mapState({
            audioLanguages: state => state.partners.audioLanguages,
            countries: state => state.partners.countries,
            currencies: state => state.partners.currencies,
            owners: state => state.partners.owners,
            partner: state => state.partners.partner,
            systemLanguages: state => state.partners.systemLanguages,
            timezones: state => state.partners.timezones,
        }), {
            branding: function() {
                if (this.partner.text && this.partner.brand && this.partner.navlink &&
                    this.partner.navlink_active && this.partner.spot && this.partner.btn_text
                ) {
                    return true
                }
                return false
            },
            formIsValid: function() {
                return !this.$v.$invalid
            },
        }),
        mounted: function() {
            // Reset branding cache on page reload.
            brandingCache = {}
            app.vuex.dispatch('partners/readPartner', app.router.currentRoute.params.partner_id)
        },
        validations: {
            partner: {
                name: {
                    required: v.required,
                    minLength: v.minLength(3),
                },
                description: {
                    maxLength: v.maxLength(63),
                },
                foreign_code: {
                    maxLength: v.maxLength(16),
                },
                email_address: {
                    email: v.email,
                },
                no_reply_email_address: {
                    email: v.email,
                },
                wiki_base_url: {
                    url: v.url,
                },
                billingprofile: {
                    billing_email: {
                        email: v.email,
                    },
                    currency: {
                        required: v.required,
                    },
                },
            },
        },
    })
}
