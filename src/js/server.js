/**
* Entrypoint for SSR renderer.
*/
const axios = require('axios')
const axiosCookieJarSupport = require('@3846masa/axios-cookiejar-support')
const tough = require('tough-cookie')

axiosCookieJarSupport(axios)

const App = require('./app')
const cookies = require('connect-cookies')
const connect = require('connect')
const morgan = require('morgan')
const serveIndex = require('serve-index')
const serveStatic = require('serve-static')
const favicon = require('serve-favicon')
const fs = require('fs')
const http = require('http')
const path = require('path')
const renderer = require('vue-server-renderer').createRenderer()

const {promisify} = require('util')

const renderToString = promisify(renderer.renderToString)
const readFileAsync = promisify(fs.readFile)

require('./lib/vendor')
require('./lib/templates')
require('./i18n/nl')

const appCache = {}
const apiHost = 'http://localhost'


function createApp(url, context, sessionId) {
    return new Promise((resolve, reject) => {
        let app
        if (!appCache[sessionId]) {
            app = new App(context, global.templates)
            appCache[sessionId] = app
        } else {
            app = appCache[sessionId]
        }

        const fullPath = app.router.resolve(url).route.fullPath
        if (fullPath !== url) {
            reject({ url: fullPath})
        }

        app.router.push(url)
        app.router.onReady(async() => {
            const matchedComponents = app.router.getMatchedComponents()

            await Promise.all(matchedComponents.map(Component => {
                if (Component.sealedOptions && Component.sealedOptions.asyncData) {
                    return Component.sealedOptions.asyncData(app.router.currentRoute)
                } else if (Component.asyncData) {
                    return Component.asyncData(app.router.currentRoute)
                } else return null
            }))

            return resolve(app)
        }, reject)
    }).catch((error) => {
        console.trace(error)
    })
}


function setupSsrProxy(indexHTML) {
    const ssrProxy = connect()
    ssrProxy.use(morgan('dev'))
    ssrProxy.use(favicon(path.join(__dirname, '../', 'img', 'favicon.ico')))
    ssrProxy.use('/public', serveStatic('/srv/http/data/frontend'))
    ssrProxy.use('/public', serveIndex('/srv/http/data/frontend', {icons: false}))
    ssrProxy.use(cookies())
    ssrProxy.use(async function(req, res, next) {
        const cookieJar = new tough.CookieJar()
        // Log the requesting user in to the proxy.
        const sessionId = req.cookies.get('sessionid')
        cookieJar.setCookieSync(`sessionid=${sessionId}`, 'http://localhost/')

        const clientCsrf = req.cookies.get('csrftoken')
        // Allow a user to modify store properties, before the snapshot
        // is rendered. This way, the snapshot can reproduce additional
        // state that's set in a cookie.
        let cookieStoreMixin = {}
        if (req.cookies.get('__STORE__')) {
            cookieStoreMixin = JSON.parse(decodeURIComponent(req.cookies.get('__STORE__')))
        }

        axios.defaults.headers = req.headers
        axios.defaults.withCredentials = true
        axios.defaults.jar = cookieJar
        // Get the initial user state from the Django API.
        const {data: store} = await axios.get(`${apiHost}/api/v2/state/?state=${req.originalUrl}`)

        axios.defaults.jar = cookieJar
        // Augment the initial state with the requester's cookie state.
        Object.assign(store, cookieStoreMixin)

        // Create an isomorphic app instance with the API's initial state.
        const app = await createApp(req.url, store, sessionId)
        axios.defaults.headers['X-CSRFToken'] = clientCsrf
        const html = await renderToString(app.vm)

        // Augment the index file with the translation file and remove the
        // current translation from the store. It will be added later.
        let translationFile = ''
        if (store.language !== 'en') {
            translationFile = `<script src="/public/js/i18n/${store.user.language}.js"></script>`
        }

        let _html = indexHTML.replace('<div id="app"></div>', html)
        // Must use the browser csrf from here on.
        store.csrf = clientCsrf
        // Inject the SSR's store in the index template.
        _html = _html.replace('<!--STORE-->', `window.__STORE__ = ${JSON.stringify(app.store)}`)
        // Do the same for the translations script tag.
        _html = _html.replace('<!--TRANSLATIONS-->', translationFile)
        res.end(_html)
    })

    return ssrProxy
}


async function initServer() {
    const indexHTML = await readFileAsync(path.join('src', 'index.html'), 'utf8')
    const ssrProxy = setupSsrProxy(indexHTML)
    http.createServer(ssrProxy).listen(3000, () => {
        // Messages to nodemon that the application is ready to serve
        // requests. Nodemon fires a livereload trigger after this.
        console.log('nodemon:start:child')
    })
}

initServer()
