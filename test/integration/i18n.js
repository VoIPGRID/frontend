const test = require('tape')

const App = require('../../src/js/app')
require('../../src/js/lib/vendor')
require('../../src/js/lib/templates')
require('../../src/js/i18n/nl')

const {partnerUser} = require('../mock/state')

const app = new App(partnerUser(), global.templates)

test('i18n missing translations', function(t) {
    t.equal(Vue.i18n.locale(), 'nl')

    t.end()
});
