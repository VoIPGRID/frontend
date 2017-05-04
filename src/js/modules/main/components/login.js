'use strict'
// URL and endpoint constants

const Component = require('../../../lib/component')


class LoginComponent extends Component {

    constructor(app) {
        super(app)
        this.template = app.templates.main_login

        // Mount state from the store to the component.
        this.computed = Vuex.mapState({
            credentials: state => state.main.credentials,
            authenticated: state => state.main.authenticated,
        })

        // Mount actions from the store to the component.
        this.methods = Vuex.mapActions([
            'login',
        ])

        Vue.component('login', {
            render: this.template.render,
            staticRenderFns: this.template.staticRenderFns,
            computed: Vuex.mapState({
                credentials: state => state.main.credentials,
                authenticated: state => state.main.authenticated,
            }),
            methods: Vuex.mapActions([
                'login',
            ]),
        })
    }
}


module.exports = LoginComponent
