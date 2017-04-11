'use strict'


class App {
    constructor() {
        this._modules = [
            {
                name: 'client',
                Module: require('./modules/client/module'),
            },
        ]

        Vue.use(VueRouter)
        this.router = new VueRouter({
            mode: 'history',
        })

        this.modules = {}
        for (let {name, Module} of this._modules) {
            this.modules[name] = new Module(this)
        }

        // Start up our app
        new Vue({
            router: this.router,
            render: h => h(App)
        }).$mount('#app')
    }
}

window.app = new App()
