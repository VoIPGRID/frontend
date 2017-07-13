/**
 * This is the global store. Each property can be shared with
 * all components in the application. Use it wisely.
 */
module.exports = function(userState) {
    return {
        user: userState,
        shouts: [],
    }
}
