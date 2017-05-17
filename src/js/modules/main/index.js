/**
 * @module main
 */

/**
 * The main app handles generic functionality that doesn't fall
 * in a distinct category.
 */
class MainApp {
    /**
     * @param {App} app - The application object.
     */
    constructor(app) {
        this.actions = require('./actions')(app)
        this.mutations = require('./mutations')(app)
        this.state = {}

        this.methods = {
            notify(notification) {
                this.vuex.actions.notify(notification)
            },
        }


    }
}


module.exports = MainApp
