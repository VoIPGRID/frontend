/**
* Entrypoint for SSR renderer.
*/
import axiosCookieJarSupport from '@3846masa/axios-cookiejar-support'
import axios from 'axios'

import tough from 'tough-cookie'

import {App} from './app'
import cookies from 'connect-cookies'
import connect from 'connect'
import morgan from 'morgan'
import serveIndex from 'serve-index'
import serveStatic from 'serve-static'
import favicon from 'serve-favicon'
import fs from 'fs'
import http from 'http'
import path from 'path'
import _renderer from 'vue-server-renderer'
const renderer = _renderer.createRenderer()

import redirect from 'connect-redirection'

import util from 'util'
const promisify = util.promisify

const renderToString = promisify(renderer.renderToString)
const readFileAsync = promisify(fs.readFile)


import _vendor from './lib/vendor.js'
import {vendor} from './lib/vendor.mjs'

import templates from './lib/templates'
import translations from './i18n/nl'

const appCache = {}
const apiHost = 'http://localhost'
const HTTP_REDIRECTS = false


/**
* Setup the context for a SSR-rendered app instance and run the url through
* the app router. It requires an initial store that's requested from the
* API and information from the original requesting browser client to
* generate the correct state.
* @param {Request} req - The connect request.
* @param {ToughCookie} cookieJar - A cookie jar with the session id.
* @param {Object} store - The store as it's passed from the API.
* @returns {App} -
*/
function createApp(req, cookieJar, store) {
    const csrfToken = req.cookies.get('csrftoken')
    const sessionId = req.cookies.get('sessionid')
    // Augment the store with the requester's cookie state.
    if (req.cookies.get('__STORE__')) {
        Object.assign(store, JSON.parse(decodeURIComponent(req.cookies.get('__STORE__'))))
    }

    const headers = req.headers
    const url = req.url

    return new Promise((resolve, reject) => {
        let app
        if (!appCache[sessionId]) {
            app = new App(store, global.templates)
            appCache[sessionId] = app
        } else {
            // Reuse the app instance and update the store.
            app = appCache[sessionId]
            Object.assign(app.store, store)
        }
        // Make sure the app has the browser's request context.
        if (!app.api.client.defaults.jar) {
            app.api.client = app.api.createClient(axiosCookieJarSupport(axios), {
                headers: Object.assign(headers, {
                    accept: 'application/json',
                    'X-CSRFToken': csrfToken,
                }),
                jar: cookieJar,
                withCredentials: true,
            })
        }


        // Set the CSRF from the requesting browser in the store.
        app.store.user.csrf = csrfToken
        app.store.ssr = true

        // Route the url through the app instance.
        app.router.push(url)
        // Make sure to call all asyncData hooks on matching components
        // after resolving the route.

        app.router.onReady(async() => {
            await app.loadHookData()
            resolve(app)
        })
    }).catch((error) => {
        console.trace(error)
    })
}


/**
* Setup middleware that funnels all requests into
* an App instance, providing Server Side Rendering for
* a requesting browser.
* @param {String} indexHTML - The index template.
* @returns {Object} - A connect application instance.
*/
function setupSsrProxy(indexHTML) {
    const ssrProxy = connect()
    ssrProxy.use(morgan('dev'))
    ssrProxy.use(redirect())
    ssrProxy.use(favicon(path.join('src', 'img', 'favicon.ico')))
    ssrProxy.use('/public', serveStatic('/srv/http/data/frontend'))
    ssrProxy.use('/public', serveIndex('/srv/http/data/frontend', {icons: false}))
    ssrProxy.use(cookies())
    ssrProxy.use(async function(req, res, next) {
        const cookieJar = new tough.CookieJar()
        cookieJar.setCookieSync(`sessionid=${req.cookies.get('sessionid')}`, 'http://localhost/')
        // Make a http call to the Django backend and get the initial user
        // state from the state view on behalf of the requesting user.
        const {data: store} = await axios.get(`${apiHost}/api/v2/state/?state=${req.originalUrl}`, {
            headers: req.headers,
            jar: cookieJar,
            withCredentials: true,
        })

        // Get an isomorphic app instance with the minimal store
        // information from the API.
        const app = await createApp(req, cookieJar, store)
        // Let the app do it's thing and render the html output.
        const html = await renderToString(app.vm)

        // Augment the index file with the translation file and remove the
        // current translation from the store. It will be added later.
        let translationFile = ''
        if (store.user.language !== 'en') {
            translationFile = `<script src="/public/js/i18n/${store.user.language}.js"></script>`
        }
        let _html = indexHTML.replace('<div id="app"></div>', html)
        // Make a copy of the store and remove the translations from it;
        // they are supplied by a separate javascript file and applied
        // before the app is rehydrated.
        let copiedStore = JSON.parse(JSON.stringify(app.store))
        copiedStore.i18n = {}
        _html = _html.replace('<!--STORE-->', `window.__STORE__ = ${JSON.stringify(copiedStore)}`)
        // Do the same for the translations script tag.
        _html = _html.replace('<!--TRANSLATIONS-->', translationFile)

        // Sync vue-router redirects with the actual http response.
        if (HTTP_REDIRECTS & (app.router.currentRoute.path !== req.url)) {
            res.redirect(path.join(app.router.options.base, app.router.currentRoute.path))
        }
        res.end(_html)
    })

    return ssrProxy
}


async function initServer() {
    const indexHTML = await readFileAsync(path.join('src', 'index.html'), 'utf8')
    const ssrProxy = setupSsrProxy(indexHTML)
    http.createServer(ssrProxy).listen(3000, '0.0.0.0', () => {
        // Messages to nodemon that the application is ready to serve
        // requests. Nodemon fires a livereload trigger after this.
        console.log('nodemon:start:child')
    })
}

initServer()
