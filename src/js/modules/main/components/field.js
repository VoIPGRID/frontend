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
                if (this.validation.required === false) {
                    errorMessages.push(this.$t('Field is required.'))
                }
                if (this.validation.minLength === false) {
                    errorMessages.push(this.$t(
                        'Field must be at least {min} characters.', {
                            min: this.validation.$params.minLength.min,
                        })
                    )
                }
                if (this.validation.maxLength === false) {
                    errorMessages.push(this.$t(
                        'Field must not be longer than {max} characters.', {
                            max: this.validation.$params.maxLength.max,
                        })
                    )
                }
                if (this.validation.email === false) {
                    errorMessages.push(this.$t(
                        'Field must be a valid email address.')
                    )
                }
                if (this.validation.url === false) {
                    errorMessages.push(this.$t(
                        'Field must be a valid url.')
                    )
                }
                return errorMessages.join('</br>')
            },
        },
        methods: {
            /**
             * Handles executing a referenced click function from
             * a parent component.
             */
            vClick: function(e) {
                if (!this.click) return
                this.click(e)
            },
            /**
             * Emits the child component's state back to it's
             * defining parent. The value is captured using `:model.sync`.
             */
            vChange: function(value) {
                // This is a checkbox.
                if (value === true || value === false) {
                    value = !value
                }
                this.$emit('update:model', value)
                if (this.validation) this.validation.$touch()
            },
            /**
             * Validation flag being used to conditionally render
             * validation-helper styling.
             */
            vInvalid: function() {
                if (!this.validation) return false
                return (this.validation.$error && this.validation.$dirty)
            },
            vRequired: function() {
                if (!this.validation) return false
                return this.validation.required
            },
        },
        props: {
            click: Function,
            disabled: Boolean,
            idfield: {
                default: 'id',
            },
            namefield: {
                default: 'name',
            },
            help: String,
            label: String,
            model: '',
            options: Array,
            placeholder: String,
            type: String,
            validation: Object,
        },
    }
}
