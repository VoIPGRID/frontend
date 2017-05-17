module.exports = function(app) {
    /**
     * @memberof module:user
     * @namespace
     */
    let actions = {}

    actions.login = ({state, commit}) => {
        app.api.post('login/', state.credentials).then((res) => {
            if (res.data) {
                window.csrf = res.data.csrf
                app.api = axios.create({
                    baseURL: 'http://localhost/api/v2/',
                    timeout: 1000,
                    headers: {'X-CSRFToken': csrf},
                })
                commit('AUTHENTICATE', true)
                app.router.replace('/')
            }
        })
    }

    actions.logout = ({state, commit}) => {
        app.api.post('logout/').then((res) => {
            if (res.data) {
                commit('AUTHENTICATE', false)
                app.router.push({name: 'user_login'})
            }
        })
    }

    return actions
}
