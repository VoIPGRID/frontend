module.exports = function(app) {
    return {
        AUTHENTICATE(state, authenticated) {
            if (authenticated) {
                state.authenticated = true
            } else {
                state.authenticated = false
            }
        },
    }
}
