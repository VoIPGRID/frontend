/**
 * @module main
 */

/**
 * The main app handles generic functionality that doesn't
 * fall in a distinct category.
 */
class MainApp {
    /**
     * @param {App} app - The application object.
     */
    constructor(app) {
        Vue.component('Field', require('./components/field')(app))
        Vue.component('Breadcrumbs', require('./components/breadcrumbs')(app))
        // this.actions = require('./actions')(app)
        // this.mutations = require('./mutations')(app)
        // this.state = {
        //     // Mostly used to trigger additional validation rules,
        //     // after server validation.
        //     apiValidation: false,
        //     user: {},
        // }

        app.router.addRoutes([{
            path: '/oops',
            name: 'oops',
            component: require('./components/oops')(app),
        }])
    }
}


module.exports = MainApp
