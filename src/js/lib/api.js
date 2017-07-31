class Api {

    constructor(app) {
        this.app = app

        // Add the Django CSRF token in the header and set the base URL
        // to VoIPGRID api V2.
        /** @memberof App */
        this.client = axios.create({
            baseURL: '/api/v2/',
            timeout: 3000,
            headers: {'X-CSRFToken': app.__state.csrf},
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
                        this.app.store.shouts.push({message: this.app.$t(error.message)})
                    }
                }
                this.app.store.main.apiValidation = fieldErrors
            }

            if (err.response.data.non_field_errors) {
                for (let nonFieldError of err.response.data.non_field_errors) {
                    this.app.store.shouts.push({message: this.app.$t(nonFieldError)})
                }
            }

            // All other error codes are part of the normal application flow.
            return Promise.resolve(err.response)
        })
    }


    /**
     * Maps API (field) error codes to Vuelidate validation errors.
     */
    mapValidation(validation) {
        const v = Vuelidate.validators
        // Used to show the validation message only once,
        // because the value can't be validated until the server
        // is requested again.
        this.fieldCache = {}
        let _v = {}
        for (const error of validation) {
            if (error.code === '2031') {
                _v[error.field] = {
                    required: v.required,
                }
            }
            // Incorrect password.
            if (error.code === '5001') {
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
            // Old password doesn't equal new password.
            if (error.code === '5002') {
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
