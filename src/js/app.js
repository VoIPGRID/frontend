'use strict'


class App {
    /**
     *
     */
    constructor(templates) {
        // Assign the template global to the app context.
        this.components = components

        this._modules = [
            {name: 'main', Module: require('./modules/main/module')},
            {name: 'clients', Module: require('./modules/clients/module')},
            {name: 'partners', Module: require('./modules/partners/module')},
        ]

        Vue.use(VueRouter)
        this.router = new VueRouter({
            mode: 'history',
        })

        this.initModules()

        // Start up virtual DOM.
        this.vdom = new Vue({
            router: this.router,
            render: createEle => createEle(this.components.main_main),
        }).$mount('#app')
    }


    /**
     * Initialize all modules.
     */
    initModules() {
        this.modules = {}
        for (let {name, Module} of this._modules) {
            this.modules[name] = new Module(this)
        }
    }
}

window.app = new App(window.components)
