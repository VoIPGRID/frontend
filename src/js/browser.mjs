/**
* Entrypoint for browser renderer.
*/
import {App} from './app.mjs'

window.app = new App(global.__STORE__, window.templates)
