module.exports = function(app) {
    /**
     * @memberof module:dashboard
     * @namespace
     */
    let mutations = {}

    mutations.MODULES_CHANGED = function(state, modules) {
        state.modules = modules
    }

    return mutations
}
