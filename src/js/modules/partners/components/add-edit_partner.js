module.exports = (app, actions) => {
    const template = app.templates.partners_add_edit_partner
    const v = Vuelidate.validators
    const $t = Vue.i18n.translate

    let brandingCache = {}
    const brandingFields = ['text', 'brand', 'navlink', 'navlink_active', 'spot', 'btn_text']
    /**
     * @memberof module:partners
     * @namespace
     */
    return {
        asyncData: async function(route) {
            let partnerData = await actions.readPartner(route.params.partner_id)
            app.store.breadcrumbs = []
            Object.assign(app.store.partners, partnerData)
        },
        computed: {
            branding: function() {
                if (this.partner.text && this.partner.brand && this.partner.navlink &&
                    this.partner.navlink_active && this.partner.spot && this.partner.btn_text
                ) {
                    return true
                }
                return false
            },
        },
        created: async function() {
            this.partner = this.$store.partners.partner

            this.tabs = [
                {id: 'partner', title: $t('Company profile')},
                {id: 'preferences', title: $t('Preferences')},
                {id: 'branding', title: $t('Branding')},
                {id: 'billing', title: $t('Billing Preferences')},
            ]
        },
        data: function() {
            return {
                tabs: [],
            }
        },
        methods: {
            fetchData: async function() {
                // Reset branding cache.
                brandingCache = {}
                const partnerId = app.router.currentRoute.params.partner_id
                const partnerData = await actions.readPartner(partnerId)
                Object.assign(this.$store.partners, partnerData)
            },
            /*
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
            upsertPartner: actions.upsertPartner,
        },
        render: template.r,
        staticRenderFns: template.s,
        store: {
            partner: 'partners.partner',
            root: 'partners',
        },
        validations: {
            partner: {
                billingprofile: {
                    billing_email: {
                        email: v.email,
                    },
                    currency: {
                        required: v.required,
                    },
                },
                description: {
                    maxLength: v.maxLength(63),
                },
                email_address: {
                    email: v.email,
                },
                foreign_code: {
                    maxLength: v.maxLength(16),
                },
                name: {
                    minLength: v.minLength(3),
                    required: v.required,
                },
                no_reply_email_address: {
                    email: v.email,
                },
                profile: {
                    audio_language: {
                        required: v.required,
                    },
                    country: {
                        code: {
                            required: v.required,
                        },
                    },
                    system_language: {
                        required: v.required,
                    },
                    timezone: {
                        required: v.required,
                    },
                },
                wiki_base_url: {
                    url: v.url,
                },
            },
        },
    }
}
