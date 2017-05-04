'use strict'

const utils = require('./utils')

module.exports = function install(Vue, store) {
    Object.defineProperties(Vue.prototype, {
        $helpers: {
            get() {
                return utils
            },
        },
    });
}
