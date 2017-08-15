/**
* Entrypoint for browser renderer.
*/
const App = require('./app')

window.app = new App(global.__INITIAL_STATE__, window.templates)
