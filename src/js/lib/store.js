/**
 * This is the global Stash store object. It's properties can be shared with
 * all components in the application. Please define new store properties in
 * modules. Assign third-party module state here. Use with care.
 * @returns {Object} - The initial global store.
 */
module.exports = function() {
    return {
        shouts: [],
    }
}
