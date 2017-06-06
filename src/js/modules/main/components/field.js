module.exports = (app) => {
    const template = app.templates.main_field

    /**
     * @memberof module:main
     * @namespace
     */
    return {
        render: template.r,
        staticRenderFns: template.s,
        computed: {
            vmodel: function() {
                return this.model
            },
            myValidation: function() {
                return this.validation
            },
            /**
             * Generates validation error messages.
             */
            validationMessage: function() {
                let errorMessages = []
                if (this.validation.$params.required) {
                    errorMessages.push(this.$t('Field is required.'))
                }
                if (this.validation.$params.minLength) {
                    errorMessages.push(this.$t(
                        'Field must be at least {min} characters.', {
                            min: this.validation.$params.minLength.min,
                        })
                    )
                }
                if (this.validation.$params.maxLength) {
                    errorMessages.push(this.$t(
                        'Field must not be longer than {max} characters.', {
                            max: this.validation.$params.maxLength.max,
                        })
                    )
                }
                return errorMessages.join('</br>')
            },
        },
        methods: {
            isInvalid: function() {
                if (!this.validation) return false
                return (this.validation.$error && this.validation.$dirty)
            },
            updateValue: function(value) {
                this.$emit('update:model', value)
                if (this.validation) this.validation.$touch()
            },
        },
        props: [
            'type',
            'model',
            'label',
            'placeholder',
            'validation',
        ],
    }
}
