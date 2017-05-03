'use strict'

module.exports = function(app) {
    return {
        logout: ({state, commit}) => {
            app.api.post('logout/').then((res) => {
                if (res.data) {
                    commit('AUTHENTICATE', false)
                    app.store.remove('user')
                    app.router.push({name: 'main_login'})
                }
            })
        },
        login: ({state, commit}) => {
            app.api.post('login/', state.credentials).then((res) => {
                if (res.data) {
                    window.csrf = res.data.csrf
                    app.api = axios.create({
                        baseURL: 'http://localhost/api/v2/',
                        timeout: 1000,
                        headers: {'X-CSRFToken': csrf},
                    })

                    app.store.set('user', res.data)
                    commit('AUTHENTICATE', true)
                    app.router.replace('/')
                }
            })
        },
    }
}
