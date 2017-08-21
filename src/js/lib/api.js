class Api {

    constructor(app) {
        this.app = app

        // Add the Django CSRF token in the header and set the base URL
        // to VoIPGRID api V2.
        /** @memberof App */
        this.client = axios.create({
            baseURL: '/api/v2/',
            headers: {
                Accept: 'application/json',
                'X-CSRFToken': app.__state.csrf,
            },
            timeout: 3000,
        })

        // Add a response interceptor that serves the default error page,
        // when the response has a status code that indicates an application
        // error.
        this.client.interceptors.response.use((response) => {
            return response
        }, (err) => {
            // Reject all status codes above 500 and serve the oops page.
            if (err.response.status >= 500) {
                app.router.push({path: '/oops'})
                // We got a fatal API error. Show the default oops page.
                return Promise.reject(err)
            }

            let fieldErrors = []

            if (Object.keys(err.response.data).length) {
                this.fieldCache = {}
                for (let error of err.response.data.errors) {
                    if (error.field !== 'None') {
                        fieldErrors.push(error)
                    } else {
                        this.app.vm.$shout({message: this.app.$t(error.message)})
                    }
                }
                this.app.store.main.apiValidation = fieldErrors
            }

            if (err.response.data.non_field_errors) {
                for (let nonFieldError of err.response.data.non_field_errors) {
                    this.app.vm.$shout({message: this.app.$t(nonFieldError)})
                }
            }

            // All other error codes are part of the normal application flow.
            return Promise.resolve(err.response)
        })
    }


    /**
     * Maps API (field) error codes to Vuelidate validation errors.
     * API errors are only shown once. When the field changes, it will
     * be valid again for that particular validation, because the value
     * can't be validated until the server is requested again.
     * @param {Observable} validation - The Vuelidate validation to modify.
     * @returns {Observable} - The updated observable validation object.
     */
    mapValidation(validation) {
        const v = Vuelidate.validators
        this.fieldCache = {}
        let _v = {}
        for (const error of validation) {
            if (error.code === '2031') {
                _v[error.field] = {
                    required: v.required,
                }
            }

            if (error.code === '3014') {
                _v[error.field] = {
                    must_be_unique: (value, component) => {
                        if (!this.fieldCache.must_be_unique) {
                            this.fieldCache.must_be_unique = value
                            return value === true
                        } else {
                            return true
                        }
                    },
                }
            }

            // Incorrect password or old password doesn't equal new one.
            if ((error.code === '5001') || (error.code === '5002')) {
                _v[error.field] = {
                    incorrect_password: (value, component) => {
                        if (!this.fieldCache.incorrect_password) {
                            this.fieldCache.incorrect_password = value
                            return value === true
                        } else {
                            return true
                        }
                    },
                }
            }
        }
        return _v
    }
}

module.exports = Api
