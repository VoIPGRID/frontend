module.exports = function install(Vue, app) {
    Object.defineProperties(Vue.prototype, {
        $helpers: {
            get() {
                return app.utils
            },
        },
    });
}
