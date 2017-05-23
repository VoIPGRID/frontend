module.exports = function(app) {
    /**
     * Global Vuex mutations. Make sure not to intervere state
     * property names with module state names.
     * @memberof module:app
     * @namespace
     */
    let mutations = Object.assign({}, _Vuex.mutations)

    return mutations
}
