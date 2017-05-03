'use strict'

class Component {
    constructor(app) {
        this.app = app
    }
    /**
     * Maps directly to a Vue component.
     */
    get component() {
        return {
            data: this.data,
            methods: this.methods,
            getters: this.getters,
            mounted: this.mounted ? this.mounted.bind(this) : null,
            render: this.template.render,
            staticRenderFns: this.template.staticRenderFns,
            computed: this.computed,
            notifications: this.notifications,
        }
    }
}

module.exports = Component
