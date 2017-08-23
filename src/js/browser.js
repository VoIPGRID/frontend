/**
* Entrypoint for browser renderer.
*/
const App = require('./app')

window.app = new App(global.__STORE__, window.templates)
