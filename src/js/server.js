/**
* Entrypoint for SSR renderer.
*/
global.Promise = require('bluebird')

const axios = require('axios')
const axiosCookieJarSupport = require('@3846masa/axios-cookiejar-support')
const tough = require('tough-cookie')

axiosCookieJarSupport(axios)

const App = require('./app')
const cookies = require('connect-cookies')
const connect = require('connect')
const serveIndex = require('serve-index')
const serveStatic = require('serve-static')
const favicon = require('serve-favicon')
const fs = require('fs')
const http = require('http')
const path = require('path')
const renderer = require('vue-server-renderer').createRenderer()

const {promisify} = require('util')

const readFileAsync = promisify(fs.readFile)

require('./lib/vendor')
require('./lib/templates')

// Provide translations for the SSR app.
global.translations = {
    nl: require('./i18n/nl'),
}


function createApp(url, context) {
    return new Promise((resolve, reject) => {
        const app = new App(context, global.templates)

        const fullPath = app.router.resolve(url).route.fullPath
        if (fullPath !== url) {
            reject({ url: fullPath})
        }

        app.router.push(url)
        app.router.onReady(async() => {
            const matchedComponents = app.router.getMatchedComponents()
            // No matched routes, reject with 404.
            if (!matchedComponents.length) return reject({code: 404})

            await Promise.all(matchedComponents.map(Component => {
                if (Component.sealedOptions && Component.sealedOptions.asyncData) {
                    return Component.sealedOptions.asyncData(app.store, app.router.currentRoute)
                } else if (Component.asyncData) {
                    Component.asyncData(app.store, app.router.currentRoute)
                }
            }))

            return resolve({app})
        }, reject)
    }).catch((error) => {
        console.trace(error)
    })
}



readFileAsync(path.join('src', 'index.html'), 'utf8').then((indexHTML, err) => {
    const _connect = connect()
    _connect.use(favicon(path.join(__dirname, '../', 'img', 'favicon.ico')))
    _connect.use('/public', serveStatic('/srv/http/data/frontend'))
    _connect.use('/public', serveIndex('/srv/http/data/frontend', {icons: false}))
    _connect.use(cookies())
    _connect.use((req, res, next) => {
        const cookieJar = new tough.CookieJar()
        cookieJar.setCookieSync(`sessionid=${req.cookies.get('sessionid')}`, 'http://localhost/')

        const clientCsrf = req.cookies.get('csrftoken')
        // Proxying requires copying the headers and passing the
        // sessionid in a cookie.
        axios.defaults.headers = req.headers
        axios.defaults.withCredentials = true
        axios.defaults.jar = cookieJar
        axios.get('http://localhost/api/v2/state/').then((_res) => {
            const initialState = _res.data
            axios.defaults.withCredentials = true
            axios.defaults.jar = cookieJar
            createApp(req.url, initialState).then(({app}) => {
                axios.defaults.headers['X-CSRFToken'] = clientCsrf
                renderer.renderToString(app.vue, (_err, html) => {
                    let _html = indexHTML.replace('<div class="wrapper column" id="app"></div>', html)
                    // Must use the browser csrf from here on.
                    initialState.csrf = clientCsrf
                    _html = _html.replace('{{state|safe}}', JSON.stringify(initialState))
                    _html = _html.replace('{{translations}}', 'nl')
                    _html = _html.replace('<!--STORE-->', `window.__INITIAL_STORE__ = ${JSON.stringify(app.store)}`)
                    _html = _html.replace('{% if translations %}', '')
                    _html = _html.replace('{% endif %}', '')
                    res.end(_html)
                })
            })
        })



    })

    http.createServer(_connect).listen(3000)


})