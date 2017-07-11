module.exports = function(app) {
    /**
     * @memberof module:main
     * @namespace
     */
    let mutations = {}

    mutations.API_VALIDATION = (state, enabled) => {
        state.apiValidation = enabled
    }

    return mutations
}
