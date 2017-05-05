'use strict'

module.exports = function(app) {
    return {
        login: ({state, commit}) => {
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
        },
        logout: ({state, commit}) => {
            app.api.post('logout/').then((res) => {
                if (res.data) {
                    commit('AUTHENTICATE', false)
                    app.router.push({name: 'main_login'})
                }
            })
        },
    }
}
