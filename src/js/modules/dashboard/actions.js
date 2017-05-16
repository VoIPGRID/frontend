module.exports = function(app) {
    /**
     * @memberof module:dashboard
     * @namespace
     */
    let actions = {}

    /**
     * Fill the modules list in the dashboard.
     * @param {Vuex} store - The client scoped Vuex store.
     * @param {Array} modules - Module specifications.
     */
    actions.fillModules = (store, modules) => {
        store.commit('MODULES_CHANGED', modules)
    }

    return actions
}
